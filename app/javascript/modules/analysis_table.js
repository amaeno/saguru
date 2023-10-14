import {add_child_object, limit_textarea_lines, dammy_text, get_table_cell_position} from "./common";


const id_analysis_table_area = "analysisTableArea";

const class_analysisQuestionGroup_list = "analysisQuestionTableList";
const class_analysisQuestionGroup_list_item = "analysisQuestionTableList__item";

const class_analysisQuestion1Table = "analysisQuestion1Table";
const class_analysisQuestion2Table = "analysisQuestion2Table";

const class_suffix_header = "__header";
const class_suffix_row = "__row";
const class_suffix_column = "__column";
const class_suffix_textarea = "__textarea";

const class_main_section_subTitle = "main__sectionSubTtl";

// 　テーブルに記述したデータを配列に保持する
let analysis_data_array = [];

export const header_analysis = {
    theme: 0,
    reason: 1,
    length: 3
};

const analysisTable_question1_theme_list = ["モチベーションが上がったのはどんな時？",
                                            "モチベーションが下がったのはどんな時？",
                                            "成功体験は？",
                                            "失敗体験は？",
                                            "活躍できた・居心地の良かったチームでの活動は？",
                                            "活躍できなかった・居心地の悪かったチームでの活動は？",
                                            "年代を通して好きなこと・得意なことは？",
                                            "年代を通して嫌いなこと・苦手なことは？"];

const analysisTable_question1_header_list = [   ["エピソード", "理由"],
                                                ["エピソード", "理由"],
                                                ["エピソード", "要因"],
                                                ["エピソード", "要因"],
                                                ["エピソード", "理由"],
                                                ["エピソード", "理由"],
                                                ["好きなこと・得意なこと", "理由"],
                                                ["嫌いなこと・苦手なこと", "理由"]];                      

const analysisTable_question2_theme_list = ["モチベーションが上がる時の共通要素は？",
                                            "モチベーションが下がる時の共通要素は？",
                                            "どんな学びや成長があった？",
                                            "どんな学びや成長があった？",
                                            "活躍できる・居心地の良い環境の共通要素は？",
                                            "活躍できない・居心地の悪い環境の共通要素は？",
                                            "得意なことの共通要素は？",
                                            "嫌いなこと・苦手なことの共通要素は？"];           
                                            
const analysisTable_question2_header_list = [   ["共通要素"],
                                                ["共通要素"],
                                                ["学び・成長"],
                                                ["学び・成長"],
                                                ["共通要素"],
                                                ["共通要素"],
                                                ["共通要素"],
                                                ["共通要素"]]; 

// 分析欄のテーブル行数
let TABLE_ROWS = 2;


// ************************************************
//     @breief:  分析記入欄の初期設定をする
//     @param[1]: -
//     @return: -
// ************************************************
export const init_analysis_table = () => {
    const analysis_table_area = document.getElementById(id_analysis_table_area);

    make_analysis_table(analysis_table_area);

    // テーブルセルの要素(textareaタグ)のリスト取得
    let analysis_cells = analysis_table_area.querySelectorAll(`.${class_analysisQuestion1Table + class_suffix_textarea}, .${class_analysisQuestion2Table + class_suffix_textarea}`);
    let len_analysis_cells = analysis_cells.length;

    // init_analysis_data_array(analysis_cells);

    // 各セルにイベント追加
    for(let num = 0; num < len_analysis_cells; num++){
        // セルのテキストが変更された場合
        analysis_cells[num].addEventListener('input', () => {
            // テキストの入力可能行数を制限
            limit_textarea_lines(analysis_cells[num]);

            // 対応する配列のデータを更新
            let analysis_cell_row_col = get_table_cell_position(analysis_cells[num].id);
            // console.log(analysis_cell_row_col);
            // episode_data_array[analysis_cell_row_col[cell_position.row]][analysis_cell_row_col[cell_position.col]] = analysis_cells[num].value;
        });
    }
}


// // ************************************************
// //     @breief:  分析記入欄の入力値を保持する配列を宣言・初期する
// //     @param[1]: テーブルセルの要素(textareaタグ)のリスト
// //     @return: -
// // ************************************************
// const init_analysis_data_array= (element_analysis_cells) => {
//     let len_episode_cells = element_episode_cells.length;
// 
//     // テーブルの大きさを算出する
//     // 最終要素のnameから行数と列数を取得し、対応した２次元配列を作成する
//     let last_cell = element_episode_cells[len_episode_cells-1].id;
//     let row_col = get_table_cell_position(last_cell);
//     
//     // 2次元配列として空文字で初期化
//     for(let row=0; row<=row_col[cell_position.row]; row++){
//         episode_data_array[row] = [];
//         for(let col=0; col<=row_col[cell_position.col]; col++) {
//             episode_data_array[row][col] = "";
//         }
//     }
// 
//     // テーブルに初期値を反映
//     for(let row=0; row<=row_col[cell_position.row]; row++){
//         // テーブル作成時の年齢を適用
//         episode_data_array[row][header_episode.age] = element_episode_cells[header_episode.length*row].value;
//         // テーブル作成時のモチベーション値を適用
//         episode_data_array[row][header_episode.motivation] = element_episode_cells[(header_episode.length * row) + header_episode.motivation].value;
//     }
//     // console.log(episode_data_array);
// }


// ************************************************
//     @breief:  分析記入欄のHTMLを生成する
//     @param[1]: #analysisTable が付与されたオブジェクト
//     @return: -
// ************************************************
const make_analysis_table = (element_analysis_table_area) => {
    const len_analysis_question_group = analysisTable_question1_theme_list.length;

    // テーブルを生成
    for(let group_num=0; group_num < len_analysis_question_group; group_num++){
        const analysis_question_group_list = add_child_object(element_analysis_table_area, "ul");
        analysis_question_group_list.className = class_analysisQuestionGroup_list;

        // 記入欄
        make_analysis_table_question(analysis_question_group_list, "Q1", group_num);
        make_analysis_table_question(analysis_question_group_list, "Q2", group_num);
    }
}


// ************************************************
//     @breief:  分析記入欄Question1のHTMLを生成する
//     @param[1]: .analysisQuestionTableList が付与されたオブジェクト
//     @param[2]: Question名(Q1 or Q2)
//     @param[3]: QuestionのGroup番号
//     @return: 実行結果
// ************************************************
const make_analysis_table_question = (element_analysis_question_group, question_no, group_num) => {
    let class_analysisQuestionTable = "";
    let theme = [];
    let header = [];

    //　Question名によってクラス名を設定
    if(question_no === "Q1"){
        class_analysisQuestionTable = class_analysisQuestion1Table;
        theme = analysisTable_question1_theme_list[group_num];
        header = analysisTable_question1_header_list[group_num];
    }
    else if(question_no === "Q2"){
        class_analysisQuestionTable = class_analysisQuestion2Table;
        theme = analysisTable_question2_theme_list[group_num];
        header = analysisTable_question2_header_list[group_num];
    }

    const analysis_question_group_list_item = add_child_object(element_analysis_question_group, "li");
    analysis_question_group_list_item.className = class_analysisQuestionGroup_list_item;

    // 設問文生成
    const analysisTable_question_theme = add_child_object(analysis_question_group_list_item, "h3");
    analysisTable_question_theme.className = class_main_section_subTitle;
    analysisTable_question_theme.textContent = theme;

    // 記入欄ラッパー生成
    const analysis_question_table = add_child_object(analysis_question_group_list_item, "div");
    analysis_question_table.className = class_analysisQuestionTable;

    // header欄生成
    const analysis_question_table_header = add_child_object(analysis_question_table, "div");
    analysis_question_table_header.className = class_analysisQuestionTable + class_suffix_header;

    for(let col_num=0; col_num < header.length; col_num++){
        const analysis_question_table_column = add_child_object(analysis_question_table_header, "div");
        analysis_question_table_column.className = class_analysisQuestionTable + class_suffix_column;
        analysis_question_table_column.textContent = header[col_num];
    }

    // 行を生成
    for(let row_num=0; row_num < TABLE_ROWS; row_num++){
        const analysis_question_table_row = add_child_object(analysis_question_table, "div");
        analysis_question_table_row.className = class_analysisQuestionTable + class_suffix_row;

        // 各行に列要素を生成
        for(let col_num=0; col_num < header.length; col_num++){
            const elem_table_column = add_child_object(analysis_question_table_row, "div");
            elem_table_column.className = class_analysisQuestionTable + class_suffix_column;

            const elem_table_textarea = add_child_object(elem_table_column, "textarea");
            elem_table_textarea.className = class_analysisQuestionTable + class_suffix_textarea;
            elem_table_textarea.rows = 2;
            elem_table_textarea.placeholder = dammy_text;
            // セル位置記録
            elem_table_textarea.id = `analysis_G${group_num}${question_no}row${row_num}col${col_num}`;
        }
    }
}
