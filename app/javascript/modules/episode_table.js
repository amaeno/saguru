import {header_episode, cell_position, get_table_cell_position, limit_textarea_lines, dammy_text, limit_input_range} from "./common";
import {update_chronology_chart_and_text} from "./chronology_chart";


const id_episode_table = "episodeTable";
const class_episodeTable_input = "episodeTable__input";
const class_episodeTable_textarea = "episodeTable__textarea";


// 　テーブルに記述したデータを配列に保持する
let episode_data_array = [];



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

    // 2次元配列を作成し初期化
    // init_episode_data_array(episode_cells);

    // 各セルにイベント追加
    for(let num = 0; num < len_episode_cells; num++){
        // セルのテキストが変更された場合
        episode_cells[num].addEventListener('input', () => {
            // テキストの入力可能行数を制限
            limit_textarea_lines(episode_cells[num]);
            limit_input_range(episode_cells[num]);

//             // 対応する配列のデータを更新
//             let evented_cell_row_col = get_table_cell_position(episode_cells[num].id);
//             episode_data_array[evented_cell_row_col[cell_position.row]][evented_cell_row_col[cell_position.col]] = episode_cells[num].value;
// 
//             // モチベーションチャート描画更新
//             update_chronology_chart_and_text(episode_data_array);
        });
    }
}


// ************************************************
//     @breief:  エピソード記入欄の入力値を保持する配列を宣言・初期する
//     @param[1]: テーブルセルの要素(textarea or inputタグ)のリスト
//     @return: -
// ************************************************
const init_episode_data_array= (element_episode_cells) => {
    let len_episode_cells = element_episode_cells.length;

    // テーブルの大きさを算出する
    // 最終要素のnameから行数と列数を取得し、対応した２次元配列を作成する
    let last_cell = element_episode_cells[len_episode_cells-1].id;
    let row_col = get_table_cell_position(last_cell);
    
    // 2次元配列として空文字で初期化
    for(let row=0; row<=row_col[cell_position.row]; row++){
        episode_data_array[row] = [];
        for(let col=0; col<=row_col[cell_position.col]; col++) {
            episode_data_array[row][col] = "";
        }
    }

    // テーブルに初期値を反映
    for(let row=0; row<=row_col[cell_position.row]; row++){
        // テーブル作成時の年齢を適用
        episode_data_array[row][header_episode.age] = element_episode_cells[header_episode.length*row].value;
        // テーブル作成時のモチベーション値を適用
        episode_data_array[row][header_episode.motivation] = element_episode_cells[(header_episode.length * row) + header_episode.motivation].value;
    }
    // console.log(episode_data_array);
}



// ************************************************
//     @breief:  エピソード記入欄で入力したデータ列ごとの配列に分解する
//     @param[1]: -
//     @return: 各列のデータが格納された配列
// ************************************************
export const get_episode_column_data_array = () => {
    let len_episode_data_array = episode_data_array.length;
    let age_array = [];
    let episode_array = [];
    let emotion_array = [];
    let motivation_array = [];
    let reason_array = [];

    // チャート作成に必要なデータを各配列へ抜き出し
    for(let row_num=0; row_num<len_episode_data_array; row_num++){
        age_array.push(episode_data_array[row_num][header_episode.age]);
        episode_array.push(episode_data_array[row_num][header_episode.episode]);
        emotion_array.push(episode_data_array[row_num][header_episode.emotion]);
        motivation_array.push(episode_data_array[row_num][header_episode.motivation]);
        reason_array.push(episode_data_array[row_num][header_episode.reason]);
    }

    return [age_array, episode_array, emotion_array, motivation_array, reason_array];
}