.PHONY : autorun tsc watch docs mkd build release clean

VERSION=$(shell grep -E "^## \[Version [0-9.]+\]" src/docs/release-notes.md | head -1 | sed 's/^.*Version\s*//;s/\].*//')
SHORTYCUT_ZIP=shortycut-$(VERSION).zip

#-----------------------------------------------------------------------------------------------------------------------
# Targets
#-----------------------------------------------------------------------------------------------------------------------

help :
	$(info $() $() tsc ....... compile TypeScript)
	$(info $() $() watch ..... watch and re-compile TypeScript)
	$(info $() $() docs ...... create documentation in src/html/resources)
	$(info $() $() mkd ....... start the MkDocs server in watch mode)
	$(info $() $() build ..... create $(SHORTYCUT_ZIP))
	$(info $() $() release ... update the GitHub Pages documentation)

tsc : src/html/resources/shortycut.js;

watch :
	tsc --watch -p src/typescript/tsconfig.json

docs : src/html/resources/docs/index.html;

mkd :
	python -m mkdocs serve -f src/mkdocs.yml 2>&1 \
		| grep -vE '(^\[|Browser Connected|Running task:|Ignore.*worker.js)'

build : build/$(SHORTYCUT_ZIP);

clean :
    ifneq "$(wildcard build)" ""
	rm -r build
    endif
    ifneq "$(wildcard src/html/resources/docs)" ""
	rm -r src/html/resources/docs
    endif
    ifneq "$(wildcard src/html/resources/shortycut.js*)" ""
	rm -r src/html/resources/shortycut.js*
    endif

#-----------------------------------------------------------------------------------------------------------------------
# build/shortycut.zip
#-----------------------------------------------------------------------------------------------------------------------

build/$(SHORTYCUT_ZIP) : docs \
						 copyDocsToBuildDirectory \
						 build/shortycut/data-template/favicons \
						 build/shortycut/data-template/search.xml \
						 build/shortycut/data-template/settings.js \
						 build/shortycut/data-template/shortcuts.js \
						 build/shortycut/data-template/web-server.properties \
						 build/shortycut/resources/arrow.svg \
						 build/shortycut/resources/favicon.ico \
						 build/shortycut/resources/local.svg \
						 build/shortycut/resources/shortycut.css \
						 build/shortycut/resources/shortycut.js \
						 build/shortycut/resources/shortycut.d.ts \
						 build/shortycut/resources/web-server.bat \
						 build/shortycut/resources/web-server.jar \
						 build/shortycut/index.html \
						 build/shortycut/LICENSE
	echo $@
	rm -f build/$(SHORTYCUT_ZIP)
	rm -rf build/shortycut/data
	cd build; zip -r -9 -q $(SHORTYCUT_ZIP) shortycut

#-----------------------------------------------------------------------------------------------------------------------
# src/html/resources/docs
#-----------------------------------------------------------------------------------------------------------------------

src/html/resources/docs/index.html : $(wildcard src/docs/* src/docs/*/* src/docs/*/*/*)
	echo src/html/resources/docs
	rm -rf src/html/resources/docs
	-mkdocs build -f src/mkdocs.yml -c 2>&1 \
		| grep -vE "(Cleaning site directory|Building documentation to directory|Documentation built in)"
	@$(foreach file, \
	           $(patsubst src/docs/%.md, src/html/resources/docs/%.html, $(wildcard src/docs/*.md)) \
			   $(patsubst %, src/html/resources/docs/%.html, 404 search), \
			   echo $(file); \
			   cat $(file) \
					| grep -vE '<link.*href=".*fonts.googleapis.com' \
					| sed 's|<a href="." class="icon icon-home">|<a href="index.html" class="icon icon-home">|g' \
					| sed 's|<span class="icon icon-circle-arrow-right"></span>| \&#x25BA;|g' \
					| sed 's|<span class="icon icon-circle-arrow-left"></span>|\&#x25C4; |g' \
					| sed 's|>Docs<|>ShortyCut<|g' \
 					> $(file).tmp; \
			   mv -f $(file).tmp $(file);)
	rm $(patsubst %, src/html/resources/docs/%, sitemap.xml*)
	rm -r src/html/resources/docs/css/fonts

#-----------------------------------------------------------------------------------------------------------------------
# build/resources/*
#-----------------------------------------------------------------------------------------------------------------------

build/shortycut/resources/% : src/html/resources/%
	echo $@
	mkdir -p build/shortycut/resources
	cp src/html/resources/$* $@

build/shortycut/resources/shortycut.css : $(wildcard src/typescript/pages/*.css)
	echo $@
	mkdir -p build/shortycut/resources
	cat $(wildcard src/typescript/pages/*.css) \
		| dos2unix \
		| tr '\n' '\a' \
		| sed -E 's#/\*([^*]|\*[^/])\*/##g' \
		| tr '\a' '\n' \
		| grep -vE '^\s*$$' \
		> $@

build/shortycut/resources/shortycut.js : src/html/resources/bootstrap.js \
										 src/html/resources/shortycut.js \
										 src/html/index.html
	echo $@
	mkdir -p build/shortycut/resources
	cat src/html/index.html \
		| dos2unix \
		| tr '\n' '\a' \
		| sed 's/\a/\\n/g' \
		| sed -E 's/<!--([^-]|-[^-]|--[^>])*-->//g' \
		| sed -E 's|^.*<\s*body[^>]*>||' \
		| sed -E 's|.*<\s*/\sbody[^>]*>.*$$||' \
		| sed "s/'/\\\\'/g" \
		| sed "s/^/var __SHORTYCUT_BODY_INNER_HTML = '/; s/$$/';\n/" \
		| tr '\a' '\n' \
		> $@
	cat src/html/resources/shortycut.js \
		| grep -v '^//#.*shortycut.js.map' \
		| sed "s/##VERSION_NUMBER##/${VERSION}/" \
		>> $@
	cat src/html/resources/bootstrap.js  \
		>> $@

src/html/resources/shortycut.js :  $(wildcard src/typescript/*.ts src/typescript/*/*.ts) src/typescript/tsconfig.json
	echo $@
	tsc -p src/typescript/tsconfig.json

#-----------------------------------------------------------------------------------------------------------------------
# build/resources/docs
#-----------------------------------------------------------------------------------------------------------------------

DOCS_SOURCES=$(wildcard src/docs/*) \
             $(wildcard src/docs/*/*) \
             $(wildcard src/docs/*/*/*) \
		     $(wildcard src/html/resources/docs/*) \
			 $(wildcard src/html/resources/docs/*/*) \
			 $(wildcard src/html/resources/docs/*/*/*) \

DOCS_TARGETS=build/shortycut/resources/docs/ \
			 $(wildcard build/shortycut/resources/docs/*) \
			 $(wildcard build/shortycut/resources/docs/*/*) \
			 $(wildcard build/shortycut/resources/docs/*/*/*) \

copyDocsToBuildDirectory : $(DOCS_TARGETS);

$(DOCS_TARGETS) : $(DOCS_SOURCES)
	echo build/shortycut/resources/docs
	mkdir -p build/shortycut/resources/docs
	rm -rf build/shortycut/resources/docs
	cp -r src/html/resources/docs build/shortycut/resources/

#-----------------------------------------------------------------------------------------------------------------------
# build/data-template/*
#-----------------------------------------------------------------------------------------------------------------------

build/shortycut/data-template/% : src/html/data-template/%
	echo $@
	mkdir -p build/shortycut/data-template
	cp src/html/data-template/$* $@

build/shortycut/data-template/favicons :
	mkdir -p build/shortycut/data-template/favicons

#-----------------------------------------------------------------------------------------------------------------------
# build/resources/web-server.*
#-----------------------------------------------------------------------------------------------------------------------

build/shortycut/resources/web-server.jar : $(wildcard src/web-server/*.java) \
                                           $(wildcard src/web-server/*.MF) \
                                           $(wildcard src/web-server/*.jks)
	echo $@
	mkdir -p build/shortycut/resources
	rm -f src/web-server/*.class
	cd src/web-server; javac8 *.java
	cd src/web-server; jar -cfm web-server.jar MANIFEST.MF *.class *.jks
	rm -f src/web-server/*.class
	mv src/web-server/web-server.jar $@

build/shortycut/resources/web-server.bat : src/web-server/web-server.bat
	echo $@
	mkdir -p build/shortycut/resources
	cp $^ $@

#-----------------------------------------------------------------------------------------------------------------------
# build/index.html
#-----------------------------------------------------------------------------------------------------------------------

build/shortycut/index.html :  src/html/index.html
	echo $@
	mkdir -p build/shortycut
	cat $^ \
		| grep -vE '^\s*<(link|script)' \
		| tr '\n' '\a' \
		| sed 's|<\s*body[^>]*>.*<\s*/\s*body[^>]*>|<body>\a</body>|g' \
		| sed 's|</head|    <link href="resources/shortycut.css" rel="stylesheet" type="text/css" />\a</head|' \
		| sed 's|</head|    <script src="resources/shortycut.js"></script>\a</head|' \
		| sed 's|</head|    <script src="data/settings.js"></script>\a</head|' \
		| sed 's|</head|    <script src="data/shortcuts.js"></script>\a</head|' \
		| tr '\a' '\n' \
		> $@

#-----------------------------------------------------------------------------------------------------------------------
# build/LICENSE
#-----------------------------------------------------------------------------------------------------------------------

build/shortycut/LICENSE : src/docs/license.md
	echo $@
	mkdir -p build/shortycut
	cat $^ \
		| grep -vE '^(#|```)' \
		| tr '\n' '\a' \
		| sed "s/^\a//g;" \
		| tr '\a' '\n' \
		> $@

#-----------------------------------------------------------------------------------------------------------------------
# docs/demo
#-----------------------------------------------------------------------------------------------------------------------

release : build/$(SHORTYCUT_ZIP)
	rm -rf ./docs
	mkdir -p docs
	echo docs/demo
	cd docs; unzip -q ../$^
	mv docs/shortycut/data-template docs/shortycut/data
	mv docs/shortycut docs/demo
	mv docs/demo/resources/docs/* docs/
	rm -r $(patsubst %, docs/demo/%, resources/docs data/favicons)
	rm $(patsubst %, docs/demo/%, resources/web-server.bat resources/web-server.jar)
	echo docs/demo/data/settings.s
	cat docs/demo/data/settings.js \
		| tr '\n' '\a' \
		| sed "s|localFolders\s*:\s*\[[^]]*\]|localFolders: []|g" \
		| sed "s|rememberUrls\s*:[^,]*|rememberUrls: false|g" \
		| tr '\a' '\n' \
		> docs/demo/data/settings.js.tmp
	mv -f docs/demo/data/settings.js.tmp docs/demo/data/settings.js
	echo docs/demo/data/shortcuts.js
	cat docs/demo/data/shortcuts.js \
		| grep -E "^\\s*(//|\\[)" \
		| sed "s/'/\\\\'/g" \
		| sed "s/^/'/g;s/$$/',/g" \
		| gawk 'BEGIN {print "shortycut.addShortcuts(["} {print} END {print "]);"}' \
		> docs/demo/data/shortcuts.js.tmp
	mv -f docs/demo/data/shortcuts.js.tmp docs/demo/data/shortcuts.js
	echo docs/demo/resources/shortycut.js
	cat docs/demo/resources/shortycut.js \
		| sed "s|resources/docs|..|g" \
		> docs/demo/resources/shortycut.js.tmp
	mv -f docs/demo/resources/shortycut.js.tmp docs/demo/resources/shortycut.js
