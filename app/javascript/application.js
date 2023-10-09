// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import {init_episode_table} from "./modules/episode_table";
import {draw_chronology_chart_and_text} from "./modules/chronology_chart";

window.onload = () => {

    // const motivation_array = [50, 90, 70, 40, 60];
    // const text_array = [[6, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [7, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [8, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [9, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [10, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'],
    //                     [6, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [7, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [8, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [9, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [10, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'],
    //                     [6, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [7, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [8, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [9, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [10, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'],
    //                     [6, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [7, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [8, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [9, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [10, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'],
    //                     [6, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [7, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [8, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [9, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [10, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'],
    //                     [6, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [7, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [8, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ'], 
    //                     [9, 'ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが'], 
    //                     [10, 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ']];

    // 初期化
    init_episode_table();
    draw_chronology_chart_and_text();
};