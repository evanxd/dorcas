.PHONY: deploy-github
deploy-github:
	git checkout master && \
	git branch -D gh-pages && \
	git branch gh-pages && \
	git push -f origin gh-pages
