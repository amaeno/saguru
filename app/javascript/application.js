// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import {init_episode_table} from "./modules/episode_table";
import {draw_chronology_chart_and_text} from "./modules/chronology_chart";

window.onload = () => {
    // 初期化
    init_episode_table();
    draw_chronology_chart_and_text();
};