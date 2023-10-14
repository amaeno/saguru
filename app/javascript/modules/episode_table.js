import {header_episode, cell_position, add_child_object, get_table_cell_position, limit_textarea_lines, dammy_text, limit_input_range} from "./common";
import {update_chronology_chart_and_text} from "./chronology_chart";


const id_episode_table = "episodeTable";
const class_episodeTable_header = "episodeTable__header";
const class_episodeTable_row = "episodeTable__row";
const class_episodeTable_column = "episodeTable__column";
const class_episodeTable_input = "episodeTable__input";
const class_episodeTable_textarea = "episodeTable__textarea";
const class_item_age = "-numItemAge";
const class_item_motivataion = "-numItemMotivation";

const episodeTable_header_list =  ["年齢", "エピソード", "当時の感情・思考", "モチベーション", "振り返って気づいたこと"];


// エピソードの最小年齢
let MIN_AGE = 6;
// エピソード欄の初期行数
let TABLE_ROWS = 19;

// 　テーブルに記述したデータを配列に保持する
let episode_data_array = [];



// ************************************************
//     @breief:  エピソード記入欄の初期設定をする
//     @param[1]: -
//     @return: -
// ************************************************
export const init_episode_table = () => {
    const episode_table = document.getElementById(id_episode_table);

    // make_episode_table(episode_table);

    // テーブルセルの要素(textarea or inputタグ)のリスト取得
    let episode_cells = episode_table.querySelectorAll(`.${class_episodeTable_input}, .${class_episodeTable_textarea}`);
    let len_episode_cells = episode_cells.length;

    // 2次元配列を作成し初期化
    init_episode_data_array(episode_cells);

    // 各セルにイベント追加
    for(let num = 0; num < len_episode_cells; num++){
        // セルのテキストが変更された場合
        episode_cells[num].addEventListener('input', () => {
            // テキストの入力可能行数を制限
            limit_textarea_lines(episode_cells[num]);
            limit_input_range(episode_cells[num]);

            // 対応する配列のデータを更新
            let evented_cell_row_col = get_table_cell_position(episode_cells[num].id);
            episode_data_array[evented_cell_row_col[cell_position.row]][evented_cell_row_col[cell_position.col]] = episode_cells[num].value;

            // モチベーションチャート描画更新
            update_chronology_chart_and_text(episode_data_array);
        });
    }
}


// ************************************************
//     @breief:  エピソード記入欄のHTMLを生成する
//     @param[1]: #episodeTable が付与されたオブジェクト
//     @return: -
// ************************************************
const make_episode_table = (element_episode_table) => {
    // テーブルのヘッダーを生成
    const episode_table_header = add_child_object(element_episode_table, "div");
    episode_table_header.className = class_episodeTable_header;

    for(let col_num=0; col_num < header_episode.length; col_num++){
        const episode_table_header_colunm = add_child_object(episode_table_header, "div");
        episode_table_header_colunm.className = class_episodeTable_column;
        episode_table_header_colunm.textContent = episodeTable_header_list[col_num];
    }

    // テーブルの行を生成
    for(let row_num=0; row_num < TABLE_ROWS; row_num++){
        const episode_table_row = add_child_object(element_episode_table, "div");
        episode_table_row.className = class_episodeTable_row;

        // 各行に列要素を生成
        for(let col_num=0; col_num < header_episode.length; col_num++){
            const elem_table_column = add_child_object(episode_table_row, "div");

            // 年齢とモチベーション値の欄はinputタグ
            if((col_num ===header_episode.age) || (col_num === header_episode.motivation)) {
                const elem_table_input = add_child_object(elem_table_column, "input");
                elem_table_input.type = "number";
                elem_table_input.min = "0";
                elem_table_input.max = "100";
                // セル位置記録
                elem_table_input.id = `episode_row${row_num}col${col_num}`;

                // 年齢の属性設定
                if(col_num === header_episode.age) {
                    elem_table_input.className = class_episodeTable_input;
                    elem_table_input.placeholder = row_num + MIN_AGE;
                    elem_table_input.value = row_num + MIN_AGE;

                    // "歳"の表示のためのクラス付与
                    elem_table_column.className = class_episodeTable_column + " " + class_item_age;
                }
                // モチベーション値の属性設定
                else {
                    elem_table_input.className = class_episodeTable_input;
                    elem_table_input.placeholder = "50";
                    elem_table_input.value = 50;

                    // "点"の表示のためのクラス付与
                    elem_table_column.className = class_episodeTable_column + " " + class_item_motivataion;
                }
            }
            else {
                const elem_table_textarea = add_child_object(elem_table_column, "textarea");
                elem_table_textarea.className = class_episodeTable_textarea;
                elem_table_textarea.rows = 2;
                elem_table_textarea.placeholder = dammy_text;
                // セル位置記録
                elem_table_textarea.id = `episode_row${row_num}col${col_num}`;

                elem_table_column.className = class_episodeTable_column;
            }
            
        }
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