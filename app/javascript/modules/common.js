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