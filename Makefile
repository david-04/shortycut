include .launchpad/Makefile.header # see .launchpad/Makefile.documentation
#-----------------------------------------------------------------------------------------------------------------------

autorun : $(LP_PREREQUISITE_BUNDLE);

#-----------------------------------------------------------------------------------------------------------------------
# Configuration
#-----------------------------------------------------------------------------------------------------------------------

VERSION=$(shell grep -E '^## \[[0-9.]+' CHANGELOG.md | head -1 | sed -E 's|^[^[]*\[||;s|\].*||')
YEAR=$(shell grep -E '^## \[[0-9.]+' CHANGELOG.md | head -1 | sed 's|.*\x28||;s|-.*||')
# SHORTYCUT_ZIP=shortycut-$(VERSION).zip

#-----------------------------------------------------------------------------------------------------------------------
# Generated files
#-----------------------------------------------------------------------------------------------------------------------

GENERATED_FILES=\
	LICENSE \
	src/user-manual/generated/license.md \
	src/user-manual/generated/release-notes.md \
	src/web-app/generated/html-body.ts \
	src/web-app/generated/version.ts

LICENSE : CHANGELOG.md
	echo "Updating $@..." && sed -i -E 's/[0-9]{4}-[0-9]{4}/2022-$(YEAR)/' $@

src/user-manual/generated/license.md : LICENSE
	echo Updating $@...  && echo "# ![](../img/arrow.svg) License\n" > $@ && cat LICENSE >> $@

src/user-manual/generated/release-notes.md : CHANGELOG.md
	echo "Updating $@..." && sed -E 's/^## \[/## [Version /g;s/^# Change Log/# ![](..\/img\/arrow.svg) Release notes/' $^ > $@

src/web-app/generated/html-body.ts : dist/index.html
	   echo "Generating $@..." \
	&& echo 'export const HTML_BODY = `' > $@ \
	&& awk '/<\/body/ { isBody = 0 } isBody { print } /<body/ { isBody = 1 }' $^ >> $@ \
	&& echo '`;' >> $@

src/web-app/generated/version.ts : CHANGELOG.md
	echo "Generating $@..." && echo 'export const VERSION = "$(VERSION)";' > $@

#-----------------------------------------------------------------------------------------------------------------------
# Format
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.format.exclude, archive build docs releases)

#-----------------------------------------------------------------------------------------------------------------------
# Compile
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.tsc.add-extra-prerequisites, $(GENERATED_FILES))

#-----------------------------------------------------------------------------------------------------------------------
# Bundle
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.bundle.add, src/web-app/shortycut.ts, dist/resources/shortycut.js, sourcemap)

#-----------------------------------------------------------------------------------------------------------------------
# Documentation
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.help.add-phony-target , docs, ............... compile the documentation)
$(call lp.help.add-phony-target , mkdocs, ............. start the MkDocs development server)

mkd mkdocs : $(GENERATED_FILES)
	echo Starting MkDocs development server... && mkdocs serve -f src/user-manual/mkdocs.yml

doc docs build/mkdocs/index.html : $(wildcard src/user-manual/* src/user-manual/*/* src/user-manual/*/*/*)
	echo "Building the user manual..." && mkdocs build -f src/user-manual/mkdocs.yml -c 2>&1

#-----------------------------------------------------------------------------------------------------------------------
# web-server
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.help.add-phony-target , web-server, ......... compile the web server)

ws web-server webserver build/web-server/web-server.jar :  $(wildcard src/web-server/*.java) \
                                                           $(wildcard src/web-server/*.MF) \
                                                           $(wildcard src/web-server/*.jks)
	   echo Building the web server... \
	&& rm -rf build/web-server/javac \
	&& mkdir -p build/web-server/javac \
	&& javac8 -sourcepath src/web-server -d build/web-server/javac $(wildcard src/web-server/*.java) \
	&& cp src/web-server/keystore.jks src/web-server/MANIFEST.MF build/web-server/javac/ \
	&& cd build/web-server/javac \
	&& jar -cfm ../web-server.jar MANIFEST.MF *.class *.jks \


#-----------------------------------------------------------------------------------------------------------------------
# Release
#-----------------------------------------------------------------------------------------------------------------------

release : $(LP_PREREQUISITE_BUNDLE) docs;

# build/$(SHORTYCUT_ZIP) : docs \
# 						 copyDocsToBuildDirectory \
# 						 build/shortycut/data-template/favicons \
# 						 build/shortycut/data-template/search.xml \
# 						 build/shortycut/data-template/settings.js \
# 						 build/shortycut/data-template/shortcuts.js \
# 						 build/shortycut/data-template/web-server.properties \
# 						 build/shortycut/resources/arrow.svg \
# 						 build/shortycut/resources/favicon.ico \
# 						 build/shortycut/resources/local.svg \
# 						 build/shortycut/resources/shortycut.css \
# 						 build/shortycut/resources/shortycut.js \
# 						 build/shortycut/resources/shortycut.d.ts \
# 						 build/shortycut/resources/web-server.bat \
# 						 build/shortycut/resources/web-server.jar \
# 						 build/shortycut/index.html \
# 						 build/shortycut/LICENSE
# 	echo $@
# 	rm -f build/$(SHORTYCUT_ZIP)
# 	rm -rf build/shortycut/data
# 	cd build; zip -r -9 -q $(SHORTYCUT_ZIP) shortycut


#-----------------------------------------------------------------------------------------------------------------------
# Clean
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.clean.files, )
$(call lp.clean.bundles) # delete bundles



# #-----------------------------------------------------------------------------------------------------------------------
# # build/resources/web-server.*
# #-----------------------------------------------------------------------------------------------------------------------


# build/shortycut/resources/web-server.bat : src/web-server/web-server.bat
# 	echo $@
# 	mkdir -p build/shortycut/resources
# 	cp $^ $@

# #-----------------------------------------------------------------------------------------------------------------------
# # docs/demo
# #-----------------------------------------------------------------------------------------------------------------------

# release : build/$(SHORTYCUT_ZIP)
# 	rm -rf ./docs
# 	mkdir -p docs
# 	echo docs/demo
# 	cd docs; unzip -q ../$^
# 	mv docs/shortycut/data-template docs/shortycut/data
# 	mv docs/shortycut docs/demo
# 	mv docs/demo/resources/docs/* docs/
# 	rm -r $(patsubst %, docs/demo/%, resources/docs data/favicons)
# 	rm $(patsubst %, docs/demo/%, resources/web-server.bat resources/web-server.jar)
# 	echo docs/demo/data/settings.s
# 	cat docs/demo/data/settings.js \
# 		| tr '\n' '\a' \
# 		| sed "s|localFolders\s*:\s*\[[^]]*\]|localFolders: []|g" \
# 		| sed "s|rememberUrls\s*:[^,]*|rememberUrls: false|g" \
# 		| tr '\a' '\n' \
# 		> docs/demo/data/settings.js.tmp
# 	mv -f docs/demo/data/settings.js.tmp docs/demo/data/settings.js
# 	echo docs/demo/data/shortcuts.js
# 	cat docs/demo/data/shortcuts.js \
# 		| grep -E "^\\s*(//|\\[)" \
# 		| sed "s/'/\\\\'/g" \
# 		| sed "s/^/'/g;s/$$/',/g" \
# 		| gawk 'BEGIN {print "shortycut.addShortcuts(["} {print} END {print "]);"}' \
# 		> docs/demo/data/shortcuts.js.tmp
# 	mv -f docs/demo/data/shortcuts.js.tmp docs/demo/data/shortcuts.js
# 	echo docs/demo/resources/shortycut.js
# 	cat docs/demo/resources/shortycut.js \
# 		| sed "s|resources/docs|..|g" \
# 		> docs/demo/resources/shortycut.js.tmp
# 	mv -f docs/demo/resources/shortycut.js.tmp docs/demo/resources/shortycut.js


#-----------------------------------------------------------------------------------------------------------------------
include .launchpad/Makefile.footer
