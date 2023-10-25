// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import {init_episode_table} from "./modules/episode_table";
import {draw_chronology_chart_and_text} from "./modules/chronology_chart";
import {init_analysis_table} from "./modules/analysis_table";
import {init_summary_table} from "./modules/summary_table";

window.onload = () => {
    // 初期化
    // init_episode_table();
    // draw_chronology_chart_and_text();
    // init_analysis_table();
    // init_summary_table();
};