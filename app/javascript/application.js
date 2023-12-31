// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import {set_button_clickEvent, set_bubble_hoverEvent, toggle_password_view, disable_send_form_press_enter} from "./modules/common";
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

            // テーブルの各行の追加・削除・ソートボタン
            set_button_clickEvent();
            // チャートのドット上にホバーメッセージを出す
            set_bubble_hoverEvent();

            disable_send_form_press_enter();

            break;
        // パスワード入力ありの画面
        case "/login":
        case "/signup":
        case "/setting":
            toggle_password_view();

            break;
        // その他の画面
        default:
            break;
    }
});