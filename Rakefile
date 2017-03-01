require 'rake'

desc "serve"
task :serve do
  sh "jekyll liveserve --incremental --baseurl ''"
end

desc "build"
task :build do
  sh "JEKYLL_ENV=production jekyll build"
end

desc "publish"
task :publish do
  sh "git subtree push --prefix _site origin gh-pages"
end