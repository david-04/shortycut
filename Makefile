include .launchpad/Makefile.header # see .launchpad/Makefile.documentation
#-----------------------------------------------------------------------------------------------------------------------

autorun : $(LP_PREREQUISITE_BUNDLE);

#-----------------------------------------------------------------------------------------------------------------------
# Configuration
#-----------------------------------------------------------------------------------------------------------------------

VERSION=$(shell grep -E '^## \[[0-9.]+' CHANGELOG.md | head -1 | sed -E 's|^[^[]*\[||;s|\].*||')
YEAR=$(shell grep -E '^## \[[0-9.]+' CHANGELOG.md | head -1 | sed 's|.*\x28||;s|-.*||')
SHORTYCUT_ZIP=shortycut-$(VERSION).zip

#-----------------------------------------------------------------------------------------------------------------------
# Format
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.format.exclude, archive build docs releases)

#-----------------------------------------------------------------------------------------------------------------------
# Compile
#-----------------------------------------------------------------------------------------------------------------------

src/web-app/generated/html-body.ts : dist/index.html
	   echo "Generating $@..." \
	&& echo 'export const HTML_BODY = `' > "$@" \
	&& awk '/<\/body/ { isBody = 0 } isBody { print } /<body/ { isBody = 1 }' "$^" >> "$@" \
	&& echo '`;' >> $@

src/web-app/generated/version.ts : CHANGELOG.md
	echo "Generating $@..." && echo 'export const VERSION = "$(VERSION)";' > $@

#-----------------------------------------------------------------------------------------------------------------------
# Bundle
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.bundle.add, src/web-app/shortycut.ts, dist/resources/shortycut.js,, \
	echo -e '"use strict";\n(() => {' > dist/resources/shortycut.js.tmp && \
	cat dist/resources/shortycut.js >> dist/resources/shortycut.js.tmp && \
	echo -e '\n})();' >> dist/resources/shortycut.js.tmp && \
	mv -f dist/resources/shortycut.js.tmp dist/resources/shortycut.js \
)

#-----------------------------------------------------------------------------------------------------------------------
# Documentation
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.help.add-phony-target, docs, ............... compile the documentation (alias: doc))
$(call lp.help.add-phony-target, mkdocs, ............. start the MkDocs development server (alias: mkd))

mkd mkdocs : ;
	echo Starting MkDocs development server... && mkdocs serve -f src/user-manual/mkdocs.yml

doc docs : build/mkdocs/index.html;

build/mkdocs/index.html : $(wildcard $(foreach GLOB, * */* */*/* */*/*/* */*/*/*/*, src/user-manual/$(GLOB)))
	echo "Building the user manual..." && mkdocs build -f src/user-manual/mkdocs.yml -c -q

src/user-manual/generated/license.md : LICENSE
	echo Updating $@...  && echo -e "# ![](../img/arrow.svg) License\n" > $@ && cat LICENSE >> $@

src/user-manual/generated/release-notes.md : CHANGELOG.md
	echo "Updating $@..." && sed -E 's/^## \[/## [Version /g;s/^# .*/# ![](..\/img\/arrow.svg) Release notes/' $^ > $@

#-----------------------------------------------------------------------------------------------------------------------
# Web server
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.help.add-phony-target, web-server, ......... compile the web server)

ws web-server webserver : build/web-server/web-server.jar;

build/web-server/web-server.jar : $(wildcard $(foreach GLOB, * */* */*/* */*/*/* */*/*/*/*, src/web-server/$(GLOB)))
	   echo Building the web server... \
	&& rm -rf build/web-server/javac \
	&& mkdir -p build/web-server/javac \
	&& javac8 -sourcepath src/web-server -d build/web-server/javac $(wildcard src/web-server/*.java) \
	&& jar -cfm build/web-server/web-server.jar src/web-server/MANIFEST.MF -C src/web-server keystore.jks -C build/web-server/javac .

#-----------------------------------------------------------------------------------------------------------------------
# Release
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.help.add-phony-target, release, ............ create release (build/$(SHORTYCUT_ZIP) and docs))
$(call lp.help.add-phony-target, unrelease, .......... git-reset ./docs)

release : build/$(SHORTYCUT_ZIP) docs/index.html;

build/$(SHORTYCUT_ZIP) : $(LP_PREREQUISITE_BUNDLE) build/mkdocs/index.html build/web-server/web-server.jar LICENSE \
                         $(wildcard $(foreach GLOB, * */* */*/* */*/*/* */*/*/*/*, dist/$(GLOB)))
	   echo "Creating $@..." \
	&& rm -rf build/release \
	&& mkdir -p build/release/shortycut/resources/docs \
	&& cp -r dist/data-template build/release/shortycut/ \
	&& cp $(foreach EXT, svg ico css js d.ts, dist/resources/*.$(EXT)) build/release/shortycut/resources/ \
	&& awk '/<\/body/ { isBody = 0 } !isBody { print } /<body/ { isBody = 1 }' dist/index.html >> build/release/shortycut/index.html \
	&& cp CHANGELOG.md LICENSE build/release/shortycut/resources \
	&& cp -r build/mkdocs/* build/release/shortycut/resources/docs/ \
	&& cp build/web-server/web-server.jar build/release/shortycut/resources/ \
	&& cp src/web-server/web-server.bat build/release/shortycut/resources/ \
	&& rm -rf $(SHORTYCUT_ZIP) \
	&& cd build/release && zip -r -9 -q ../$(SHORTYCUT_ZIP) shortycut && cd ../..

LICENSE : CHANGELOG.md
	echo "Updating $@..." && sed -i -E 's/[0-9]{4}-[0-9]{4}/2022-$(YEAR)/' $@

docs/index.html : build/mkdocs/index.html build/$(SHORTYCUT_ZIP) $(wildcard dist/resources/data-demo/*)
	   echo "Updating docs..." \
	&& rm -rf ./docs \
	&& unzip -q build/$(SHORTYCUT_ZIP) -d docs \
	&& mv docs/shortycut docs/demo \
	&& rm -rf docs/demo/data-template $(foreach GLOB, docs web-server* CHANGELOG.md LICENSE, docs/demo/resources/$(GLOB)) \
	&& cp -r dist/data-demo docs/demo/data \
	&& cp -r build/mkdocs/* docs/ \

unrelease : ;
	echo "Reverting ./doc..." && git checkout -- docs && git clean -fdx docs

#-----------------------------------------------------------------------------------------------------------------------
# Clean
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.clean.files, build dist/resources/shortycut.css* dist/resources/shortycut.js*)

#-----------------------------------------------------------------------------------------------------------------------
include .launchpad/Makefile.footer
