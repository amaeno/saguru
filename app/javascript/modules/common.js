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

        // textarea_object.addEventListener("input", () =>  {
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