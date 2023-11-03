// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import {init_episode_table} from "./modules/episode_table";
import {draw_chronology_chart_and_text} from "./modules/chronology_chart";
import {init_analysis_table} from "./modules/analysis_table";
import {init_summary_table} from "./modules/summary_table";

// 特定ページ訪問時毎に実行
document.addEventListener("turbo:load", () => {
    switch (location.pathname) {
        // 自己分析画面
        case "/saguru":
            init_episode_table();
            draw_chronology_chart_and_text();
            init_analysis_table();
            init_summary_table();

            break;
        // その他の画面
        default:
            break;
    }
});