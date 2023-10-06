import {header_episode, add_child_object} from "./common";
import {update_chronology_chart_and_text} from "./chronology_chart";


const id_episode_table = "episodeTable";
const class_episodeTable_row = "episodeTable__row";
const class_episodeTable_column = "episodeTable__column";
const class_episodeTable_input = "episodeTable__input";
const class_episodeTable_textarea = "episodeTable__textarea";
const class_item_age = "-numItemAge";
const class_item_motivataion = "-numItemMotivation";

const dammy_text = "ここに入力";

let table_rows = 10;

// 　テーブルに記述したデータを配列に保持する
export let g_episode_data_array = [];



// ************************************************
//     @breief:  エピソード記入欄の初期設定をする
//     @param[1]: -
//     @return: -
// ************************************************
export const init_episode_table = () => {
    const episode_table = document.getElementById(id_episode_table);

    make_episode_table(episode_table, table_rows);

    // テーブルセルの要素(textarea or inputタグ)のリスト取得
    let episode_cells = episode_table.querySelectorAll(`.${class_episodeTable_input}, .${class_episodeTable_textarea}`);
    let len_episode_cells = episode_cells.length;

    // 2次元配列を作成し初期化
    init_episode_data_array(episode_cells, len_episode_cells);

    for(let num = 0; num < len_episode_cells; num++){
        // 各セルにイベント追加
        episode_cells[num].addEventListener('change', () => {
            // セルのテキストが変更された場合、対応する配列のデータを更新
            let evented_cell_row_col = get_episode_cell_position(episode_cells[num].name);
            g_episode_data_array[evented_cell_row_col[0]][evented_cell_row_col[1]] = episode_cells[num].value;

            // モチベーションチャート更新
            update_chronology_chart_and_text(g_episode_data_array);

            // console.log(episode_cells[num].name);
            // console.log(episode_cells[num].value);
            // console.log(g_episode_data_array);
        });
    }
}


// ************************************************
//     @breief:  エピソード記入欄のHTMLを生成する
//     @param[1]: #episodeTable が付与されたオブジェクト
//     @param[2]: 生成するテーブルの行数
//     @return: -
// ************************************************
const make_episode_table = (element_episode_table, table_rows) => {
    // テーブルの行を生成
    for(let row_num=0; row_num < table_rows; row_num++){
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
                elem_table_input.name = `episode_row${row_num}col${col_num}`;

                // 年齢の属性設定
                if(col_num === header_episode.age) {
                    elem_table_input.className = class_episodeTable_input;
                    elem_table_input.placeholder = row_num;

                    // "歳"の表示のためのクラス付与
                    elem_table_column.className = class_episodeTable_column + " " + class_item_age;
                }
                // モチベーション値の属性設定
                else {
                    elem_table_input.className = class_episodeTable_input;
                    elem_table_input.placeholder = "100";  

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
                elem_table_textarea.name = `episode_row${row_num}col${col_num}`;

                elem_table_column.className = class_episodeTable_column;
            }
            
        }
    }
}


// ************************************************
//     @breief:  エピソード記入欄の入力値を保持する配列を宣言・初期する
//     @param[1]: テーブルセルの要素(textarea or inputタグ)のリスト
//     @param[2]: テーブルセルの要素数
//     @return: -
// ************************************************
const init_episode_data_array= (element_episode_cells, len_episode_cells) => {
    // テーブルの大きさを算出する
    // 最終要素のnameから行数と列数を取得し、対応した２次元配列を作成する
    let last_cell = element_episode_cells[len_episode_cells-1].name;
    let row_col = get_episode_cell_position(last_cell);

    // 2次元配列として空文字で初期化
    for(let row=0; row<=row_col[0]; row++){
        g_episode_data_array[row] = [];
        for(let col=0; col<=row_col[1]; col++) {
            g_episode_data_array[row][col] = "";
        }
    }
}


// ************************************************
//     @breief:  エピソード記入欄のセルの位置を出力する
//     @param[1]: テーブルセルの要素(textarea or inputタグ)のname属性
//     @return:  [行数, 列数]
// ************************************************
const get_episode_cell_position= (element_episode_cells_name) => {
    // nameから数値のみ抽出([row, col]の順で格納さている)
    let row_col = element_episode_cells_name.match(/\d+/g);

    return row_col;
}


// ************************************************
//     @breief:  エピソード記入欄で入力したデータ列ごとの配列に分解する
//     @param[1]: エピソード記入欄で入力したデータの配列
//     @return: 各列のデータが格納された配列
// ************************************************
export const get_episode_column_data_array = () => {
    let len_episode_data_array = g_episode_data_array.length;
    let age_array = [];
    let episode_array = [];
    let emotion_array = [];
    let motivation_array = [];
    let reason_array = [];

    // チャート作成に必要なデータを各配列へ抜き出し
    for(let row_num=0; row_num<len_episode_data_array; row_num++){
        age_array.push(g_episode_data_array[row_num][header_episode.age]);
        episode_array.push(g_episode_data_array[row_num][header_episode.episode]);
        emotion_array.push(g_episode_data_array[row_num][header_episode.emotion]);
        motivation_array.push(g_episode_data_array[row_num][header_episode.motivation]);
        reason_array.push(g_episode_data_array[row_num][header_episode.reason]);
    }

    return [age_array, episode_array, emotion_array, motivation_array, reason_array];
}