Project Workflow

#### Console

rvm use --create 2.0.0@longsword
gem install rails
rails new longsword
cd longsword
rvm --rvmrc 2.0.0@longsword

##### .gitignore:
.idea/*
.rvmrc

##### Gemfile:
group :assets do
  gem 'haml'
  gem 'sass-rails'
  gem 'compass-rails'
  gem 'susy', git: "git://github.com/ericam/susy.git"
  gem 'sassy-buttons'
  gem 'uglifier', '>= 1.0.3'
end

####
bundle install

#### global.css.scss:
@import "compass";
@import "base";


#### _base.css.scss

// ---------------------------------------------------------------------------
// Imports

@import "susy";
@import "sassy-buttons"

// ---------------------------------------------------------------------------
// Basic Grid

$total-columns  : 12;
$column-width   : 4em;
$gutter-width   : 1em;
$grid-padding   : $gutter-width;

$show-grid-backgrounds  : true;