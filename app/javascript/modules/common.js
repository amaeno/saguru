// 判定確認用変数
export const status = {
    NG: false,
    OK: true
};

// header列識別用辞書
export const header_episode = {
    age: 0,
    episode: 1,
    emotion: 2,
    motivation: 3,
    reason: 4,
    length: 5
};

export const header_analysis = {
    age: 0,
    episode: 1,
    emotion: 2,
    motivation: 3,
    reason: 4,
    length: 5
};


//  セル位置判別用辞書
export const cell_position = {
    row: 0,
    col: 1
};


// textareaの最大行数
const MAX_LINE_NUM = 2;

// inputの上限値
const MAX_INPUT_NUM = 100;

// inputの下限値
const MIN_INPUT_NUM = 0;

// textareaのplaceholder
export const dammy_text = "ここに入力";


// ************************************************
//     @breief:  指定したタグの子要素を追加生成する
//     @param[1]:  親要素のオブジェクト
//     @param[2]:  作りたいタグ名
//     @return: 子要素のオブジェクト
// ************************************************
export const add_child_object = (parent_object, tag_name) => {
    const elem_new_tag = document.createElement(String(tag_name));
    const child_object = parent_object.appendChild(elem_new_tag);

    return child_object;
}



// ************************************************
//     @breief:  textareaの入力可能行数を制限する
//     @param[1]:  textareaのオブジェクト
//     @return: -
// ************************************************
export const limit_textarea_lines = (textarea_object) => {
    if(textarea_object.tagName === "TEXTAREA"){
        let output_text = "";

        // input_object.addEventListener("input", () =>  {
            // 入力テキストを列ごとに配列に格納
            let lines = textarea_object.value.split("\n");
    
            // 指定行数を超えた入力部分はテキストを削除
            if(lines.length > MAX_LINE_NUM ){
                for (let i = 0; i < MAX_LINE_NUM; i++) {
                    // 制限行到達時は改行しない
                    if(i === (MAX_LINE_NUM - 1)){
                        output_text += lines[i];
                    }
                    else  {
                        output_text += lines[i] + "\n";
                    }
                }
                textarea_object.value = output_text;
            }
        // });
    }
}



// ************************************************
//     @breief:  inputの入力可能上限/下限を制限する
//     @param[1]:  inputのオブジェクト
//     @return: -
// ************************************************
export const limit_input_range = (input_object) => {
    if(input_object.tagName === "INPUT"){

        // textarea_object.addEventListener("input", () =>  {
        let input_num = input_object.value;

        // 上限を超えたら最大値を設定
        if(input_num > MAX_INPUT_NUM ){
            input_object.value = MAX_INPUT_NUM;
        }
        // 下限を超えたら最大値を設定
        if(input_num < MIN_INPUT_NUM ){
            input_object.value = MIN_INPUT_NUM;
        }
        // });
    }
}


// ************************************************
//     @breief:  記入欄のセルの位置を出力する
//     @param[1]: テーブルセルの要素(textarea or inputタグ)のid属性
//     @return:  [行数, 列数] or [グループ番号, Question番号, 行数, 列数]
// ************************************************
export const get_table_cell_position= (element_table_cells_id) => {
    // id末尾 "_"以降からセル位置の数値のみ抽出([row, col] or [group, question, row, col]の順で格納されている)
    let cell_info = element_table_cells_id.split("_");
    let cell_position = cell_info.pop().match(/\d+/g);

    return cell_position;
}