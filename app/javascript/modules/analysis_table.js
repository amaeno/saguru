import {header_episode, add_child_object} from "./common";


const id_analysis_table_area = "analysisTableArea";
const id_analysis_table = "analysisTable";
const class_analysisTable_header = "analysisTable__header";
const class_analysisTable_row = "analysisTable__row";
const class_analysisTable_column = "analysisTable__column";
const class_analysisTable_input = "analysisTable__input";
const class_analysisTable_textarea = "analysisTable__textarea";



export const header_analysis = {
    theme: 0,
    reason: 1,
    length: 3
};

const analysis_table_list = [ [["マイナス→プラス", "理由"],    ["プラス→マイナス", "理由"]],                               // テーブル0のヘッダー
                               [["興味のあること", "理由"],     ["長所・得意なこと", "理由"],   ["短所・苦手なこと", "理由"]]]; // テーブル1のヘッダー



const analysis_section = ["モチベーションが逆転したエピソード", "共通する傾向"];
const analysis_table_theme1_header= [["マイナス→プラス", "理由"],   ["プラス→マイナス", "理由"]];
const analysis_table_theme2_header= [["興味のあること", "理由"],    ["長所・得意なこと", "理由"],   ["短所・苦手なこと", "理由"]];

// 分析欄のテーブル行数
let TABLE_ROWS = 2;


// ************************************************
//     @breief:  分析記入欄の初期設定をする
//     @param[1]: -
//     @return: -
// ************************************************
export const init_analysis_table = () => {
    const analysis_table_area = document.getElementById(id_analysis_table_area);

    make_analysis_table(analysis_table_area, analysis_header_list);

//     // テーブルセルの要素(textarea or inputタグ)のリスト取得
//     let episode_cells = episode_table.querySelectorAll(`.${class_episodeTable_input}, .${class_episodeTable_textarea}`);
//     let len_episode_cells = episode_cells.length;
// 
//     // 2次元配列を作成し初期化
//     init_episode_data_array(episode_cells, len_episode_cells);
// 
//     for(let num = 0; num < len_episode_cells; num++){
//         // 各セルにイベント追加
//         episode_cells[num].addEventListener('change', () => {
//             // セルのテキストが変更された場合、対応する配列のデータを更新
//             let evented_cell_row_col = get_episode_cell_position(episode_cells[num].name);
//             g_episode_data_array[evented_cell_row_col[0]][evented_cell_row_col[1]] = episode_cells[num].value;
// 
//             // モチベーションチャート更新
//             update_chronology_chart_and_text(g_episode_data_array);
// 
//             // console.log(episode_cells[num].name);
//             // console.log(episode_cells[num].value);
//             // console.log(g_episode_data_array);
//         });
//     }
}

// ************************************************
//     @breief:  分析記入欄のHTMLを生成する
//     @param[1]: #analysisTable が付与されたオブジェクト
//     @param[2]: 生成するテーブルの数
//     @param[3]: 生成するテーブルの行数
//     @return: -
// ************************************************
const make_analysis_table = (element_analysis_table_area, analysis_header_list) => {

    const section_num = analysis_header_list.length;

    // テーブルを生成
    for(let section_no=0; section_no < section_num; section_no++){
        // header生成
        const analysis_header = add_child_object(element_analysis_table_area, "div");
        analysis_header.className = class_analysisTable_header;

        for(let col_num=0; col_num < header_analysis.length; col_num++){
            const analysis_header_column = add_child_object(analysis_header, "div");
            analysis_header_column.className = class_analysisTable_column;
            analysis_header_column.value = analysis_header_list[section_no][col_num];
        }

        // 行を生成
        for(let row_num=0; row_num < TABLE_ROWS; row_num++){
            const analysis_table_row = add_child_object(element_analysis_table_area, "div");
            analysis_table_row.className = class_analysisTable_row;

            // 各行に列要素を生成
            for(let col_num=0; col_num < header_analysis.length; col_num++){
                const elem_table_column = add_child_object(analysis_table_row, "div");

                const elem_table_textarea = add_child_object(elem_table_column, "textarea");
                elem_table_textarea.className = class_episodeTable_textarea;
                elem_table_textarea.rows = 2;
                elem_table_textarea.placeholder = dammy_text;
                // セル位置記録
                elem_table_textarea.name = `analysis_row${row_num}col${col_num}`;

                elem_table_column.className = class_analysisTable_column;
            }
        }
    }
}
