import {header_episode, limit_textarea_lines, limit_input_range} from "./common";
import {update_chronology_chart_and_text} from "./chronology_chart";


const id_episode_table = "episodeTable";
const class_episodeTable_input = "episodeTable__input";
const class_episodeTable_textarea = "episodeTable__textarea";

// 　テーブルに記述したデータを配列に保持する
export let episode_data_array = [];


// ************************************************
//     @breief:  エピソード記入欄の初期設定をする
//     @param[1]: -
//     @return: -
// ************************************************
export const init_episode_table = () => {
    const episode_table = document.getElementById(id_episode_table);

    // テーブルセルの要素(textarea or inputタグ)のリスト取得
    let episode_cells = episode_table.querySelectorAll(`.${class_episodeTable_input}, .${class_episodeTable_textarea}`);
    let len_episode_cells = episode_cells.length;

    episode_data_array = get_episode_column_data_array(episode_cells);

    // 各セルにイベント追加
    for(let num = 0; num < len_episode_cells; num++){
        // セルのテキストが変更された場合
        episode_cells[num].addEventListener('input', () => {
            // テキストの入力可能行数を制限
            limit_textarea_lines(episode_cells[num]);
            limit_input_range(episode_cells[num]);

            let row_num = Math.floor(num / header_episode.length);
            let col_num = num % header_episode.length;

            // モチベーションチャートへ渡す配列の更新
            episode_data_array[col_num][row_num] = episode_cells[num].value;

            // モチベーションチャート描画更新
            update_chronology_chart_and_text();
        });
    }
}


// ************************************************
//     @breief:  エピソード記入欄で入力したデータ列ごとの配列に分解する
//     @param[1]: エピソード記入欄のinput/textareaオブジェクト
//     @return: 各列のデータが格納された配列
// ************************************************
export const get_episode_column_data_array = (episode_cell_datas) => {
    let len_episode_cell_datas = episode_cell_datas.length;
    let age_array = [];
    let episode_array = [];
    let emotion_array = [];
    let motivation_array = [];
    let awareness_array = [];

    // チャート作成に必要なデータを各配列へ抜き出し
    for(let cell_num=0; cell_num < len_episode_cell_datas; cell_num++){
        switch (cell_num % header_episode.length) {
            case header_episode.age:
                age_array.push(episode_cell_datas[cell_num].value);
                break;
            case header_episode.episode:
                episode_array.push(episode_cell_datas[cell_num].value);
                break;
            case header_episode.emotion:
                emotion_array.push(episode_cell_datas[cell_num].value);
                break;
            case header_episode.motivation:
                motivation_array.push(episode_cell_datas[cell_num].value);
                break;
            case header_episode.awareness:
                awareness_array.push(episode_cell_datas[cell_num].value);
                break;
            default:
                console.log("不正な値");
                break;
        }
    }

    return [age_array, episode_array, emotion_array, motivation_array, awareness_array];
}