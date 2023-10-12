import {cell_position, add_child_object, get_table_cell_position, limit_textarea_lines, dammy_text} from "./common";


const id_summary_table_area = "summaryTableArea";

const class_summaryTable_list = "summayTabeleList";
const class_summaryTable_list_item =  "summayTabeleList__item";

const class_summaryTable = "summaryTable";
const class_summaryTable_header = "summaryTable__header";
const class_summaryTable_row = "summaryTable__row";
const class_summaryTable_column = "summaryTable__column";
const class_summaryTable_textarea = "summaryTable__textarea";


const summaryTable_header_list = [  "価値観・大切にしている考え",
                                    "やりたいこと",
                                    "活躍できる環境",
                                    "目指す姿"]; 

//  まとめ欄のテーブル行数
let TABLE_ROWS = 1;


// ************************************************
//     @breief:  まとめ記入欄の初期設定をする
//     @param[1]: -
//     @return: -
// ************************************************
export const init_summary_table = () => {
    const summary_table = document.getElementById(id_summary_table_area);

    make_summary_table(summary_table);

    // テーブルセルの要素(textarea or inputタグ)のリスト取得
    let summary_cells = summary_table.querySelectorAll(`.${class_summaryTable_textarea}`);
    let len_summary_cells = summary_cells.length;

    // init_summary_data_array(summary_cells);

    // 各セルにイベント追加
    for(let num = 0; num < len_summary_cells; num++){
        // セルのテキストが変更された場合
        summary_cells[num].addEventListener('input', () => {
            // テキストの入力可能行数を制限
            limit_textarea_lines(summary_cells[num]);

            // 対応する配列のデータを更新
            let evented_cell_row_col = get_table_cell_position(summary_cells[num].id);
            // summary_data_array[evented_cell_row_col[cell_position.row]][evented_cell_row_col[cell_position.col]] = summary_cells[num].value;
        });
    }
}

// ************************************************
//     @breief:  まとめ記入欄のHTMLを生成する
//     @param[1]: #summaryTable が付与されたオブジェクト
//     @return: -
// ************************************************
const make_summary_table = (element_summary_table_area) => {
    const len_summaryTable_header = summaryTable_header_list.length;

    const summary_table_list = add_child_object(element_summary_table_area, "ul");
    summary_table_list.className = class_summaryTable_list;

    // テーブルを生成
    for(let group_num=0; group_num < len_summaryTable_header; group_num++){
        const summary_table_list_item = add_child_object(summary_table_list, "li");
        summary_table_list_item.className = class_summaryTable + " " + class_summaryTable_list_item;

        // header
        const summary_table_header = add_child_object(summary_table_list_item, "div");
        summary_table_header.className = class_summaryTable_header;

        const summary_table_column = add_child_object(summary_table_header, "div");
        summary_table_column.className = class_summaryTable_column;
        summary_table_column.textContent = summaryTable_header_list[group_num];

        // 記入欄
        for(let row_num=0; row_num < TABLE_ROWS; row_num++){
            const elem_table_row = add_child_object(summary_table_list_item, "div");
            elem_table_row.className = class_summaryTable_row;
            
            const elem_table_column = add_child_object(elem_table_row, "div");
            elem_table_column.className = class_summaryTable_column;

            const elem_table_textarea = add_child_object(elem_table_column, "textarea");
            elem_table_textarea.className = class_summaryTable_textarea;
            elem_table_textarea.rows = 2;
            elem_table_textarea.placeholder = dammy_text;
            // セル位置記録
            elem_table_textarea.id = `summary_G${group_num}row${row_num}col0`;
        }
    }
}