import {header_episode, limit_textarea_lines, limit_input_range} from "./common";
import {draw_chronology_chart_and_text} from "./chronology_chart";


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
    episode_data_array = get_episode_column_data_array(episode_cells);
    set_episode_cell_datas(episode_data_array);

    episode_table.addEventListener('input', (event) => {
        if (event.target && 
            (event.target.classList.contains("episodeTable__input") || event.target.classList.contains("episodeTable__textarea"))) {
            // テキストの入力可能行数を制限
            limit_textarea_lines(event.target);
            limit_input_range(event.target);

            let row_num = Number(event.target.id.match(/r_\d+/)[0].split("_")[1]);
            let col_num = 0

            const header_col = String(event.target.id.match(/c_\w+/)[0].split("_")[1])
            switch (header_col){
                case "age":
                    col_num = 0;
                    break;
                case "episode":
                    col_num = 1;
                    break;
                case "emotion":
                    col_num = 2;
                    break;
                case "motivation":
                    col_num = 3;
                    break;
                case "awareness":
                    col_num = 4;
                    break;
                default:
                    break;
            }

            // モチベーションチャートへ渡す配列の更新
            episode_data_array[col_num][row_num] = event.target.value;
            update_episode_table(episode_data_array);

            // モチベーションチャート描画更新
            draw_chronology_chart_and_text();
        }
    });
}

// ************************************************
//     @breief:  エピソード記入欄の配列を更新する
//     @param[1]: -
//     @return: -
// ************************************************
export const update_episode_table = () => {
    const episode_table = document.getElementById(id_episode_table);

    // テーブルセルの要素(textarea or inputタグ)のリスト取得
    let episode_cells = episode_table.querySelectorAll(`.${class_episodeTable_input}, .${class_episodeTable_textarea}`);
    episode_data_array = get_episode_column_data_array(episode_cells);
    set_episode_cell_datas(episode_data_array);
}


// ************************************************
//     @breief:  エピソード記入欄で入力したデータ列ごとの配列に分解する
//     @param[1]: エピソード記入欄のinput/textareaオブジェクト
//     @return: 各列のデータが格納された配列
// ************************************************
export const get_episode_column_data_array = (episode_cell_datas) => {
    let age_array = [];
    let episode_array = [];
    let emotion_array = [];
    let motivation_array = [];
    let awareness_array = [];

    // 年齢昇順で並び替え
    let soted_episode_cell_datas = sort_episode_cell_datas(episode_cell_datas);
    let len_soted_episode_cell_datas = soted_episode_cell_datas.length;

    // チャート作成に必要なデータを各配列へ抜き出し
    for(let row_num=0; row_num < len_soted_episode_cell_datas; row_num++){
        age_array.push(soted_episode_cell_datas[row_num][header_episode.age]);
        episode_array.push(soted_episode_cell_datas[row_num][header_episode.episode]);
        emotion_array.push(soted_episode_cell_datas[row_num][header_episode.emotion]);
        motivation_array.push(soted_episode_cell_datas[row_num][header_episode.motivation]);
        awareness_array.push(soted_episode_cell_datas[row_num][header_episode.awareness]);
    }

    return [age_array, episode_array, emotion_array, motivation_array, awareness_array];
}


// ************************************************
//     @breief:  エピソード記入欄で入力したデータを年齢昇順でソートする
//     @param[1]: エピソード記入欄のinput/textareaオブジェクト
//     @return: 各列のデータが格納された配列
// ************************************************
const sort_episode_cell_datas = (episode_cell_datas) => {
    let len_episode_cell_datas = episode_cell_datas.length;
    let col_cnt = 0;
    let row_array = [];
    let new_episode_data_array = [];

    // 行ごとにデータをまとめて配列へ格納
    for(let cell_num=0; cell_num < len_episode_cell_datas; cell_num++){
        if(col_cnt < header_episode.awareness) {
            row_array.push(episode_cell_datas[cell_num].value);
            col_cnt += 1;
        }
        else if(col_cnt === header_episode.awareness){
            row_array.push(episode_cell_datas[cell_num].value);
            new_episode_data_array.push(row_array);

            row_array = [];
            col_cnt = 0;
        }
    }

    // 年齢昇順で並び替え
    new_episode_data_array.sort((pre, post) => {
        return (pre[header_episode.age] - post[header_episode.age]);
    });

    return new_episode_data_array;
}


// ************************************************
//     @breief:  エピソード記入欄の表示を更新
//     @param[1]: エピソード記入欄の配列
//     @return: -
// ************************************************
const set_episode_cell_datas = (episode_data) => {
    const episode_table = document.getElementById(id_episode_table);
    let episode_cells = episode_table.querySelectorAll(`.${class_episodeTable_input}, .${class_episodeTable_textarea}`);
    let len_episode_cells = episode_cells.length;

    for(let cell_num=0; cell_num < len_episode_cells; cell_num++){
        let row_num = Number(episode_cells[cell_num].id.match(/r_\d+/)[0].split("_")[1]);
    
        switch(cell_num % header_episode.length){
            case header_episode.age:
                episode_cells[cell_num].value = episode_data_array[header_episode.age][row_num];
                break;
            case header_episode.episode:
                episode_cells[cell_num].value = episode_data_array[header_episode.episode][row_num];
                break;
            case header_episode.emotion:
                episode_cells[cell_num].value = episode_data_array[header_episode.emotion][row_num];
                break;
            case header_episode.motivation:
                episode_cells[cell_num].value = episode_data_array[header_episode.motivation][row_num];
                break;
            case header_episode.awareness:
                episode_cells[cell_num].value = episode_data_array[header_episode.awareness][row_num];
                break;
            default:
                console.log("不正な値");
                break;
        }
    }
}


// ************************************************
//     @breief:  エピソード記入欄に新規行を追加する
//     @param[1]: クリックされた行の要素
//     @return: -
// ************************************************
export const add_episode_new_row = (clickedElement) => {
    // ボタンが押された行のid名を取得する
    const clickedRowElement = clickedElement.parentNode.parentNode; // episodeTableMenuItem__rowNoXX
    let target_row = clickedRowElement.getAttribute("id");
    let target_rowNo = Number(target_row.split("rowNo")[1]);
    let target_motivation = 50;
    let target_age = document.getElementById(`episode_g_0_r_${target_rowNo}_c_age`).getAttribute("value");


    // 追加行以降の要素のidを全て1増やす
    const episode_row_elems = document.querySelectorAll(`[id*="episode_g_0_r_"]`);

    episode_row_elems.forEach(episode_row => {
        let row_id = episode_row.id;
        let row_rowNo = Number(row_id.match(/r_\d+/)[0].split("_")[1]);

        // 追加行以降かチェック
        if(row_rowNo > target_rowNo){
            episode_row.id = episode_row.id.replace(/r_\d+/, `r_${row_rowNo + 1}`);
            episode_row.name = episode_row.id.replace(/r_\d+/, `r_${row_rowNo + 1}`);
        }
    });
    
    const episode_rowWrapper_elems = document.querySelectorAll(`[id*="episodeTable__rowNo"]`);

    episode_rowWrapper_elems.forEach(episode_row => {
        let row_id = episode_row.id;
        let row_rowNo = Number(row_id.match(/\d+/)[0]);

        // 追加行以降かチェック
        if(row_rowNo > target_rowNo){
            episode_row.id = episode_row.id.replace(/\d+/, `${row_rowNo + 1}`);
        }
    });

    const episodeTableMenu_elems = document.querySelectorAll(`[id*="episodeTableMenu__rowNo"]`);

    episodeTableMenu_elems.forEach(episode_row => {
        let row_id = episode_row.id;
        let row_rowNo = Number(row_id.match(/\d+/)[0]);

        // 追加行以降かチェック
        if(row_rowNo > target_rowNo){
            episode_row.id = episode_row.id.replace(/\d+/, `${row_rowNo + 1}`);
        }
    });

    const episodeTableMenuLavel_elems = document.querySelectorAll(`[id*="episodeTableMenuLavel__rowNo"]`);

    episodeTableMenuLavel_elems.forEach(episode_row => {
        let row_id = episode_row.id;
        let row_rowNo = Number(row_id.match(/\d+/)[0]);

        // 追加行以降かチェック
        if(row_rowNo > target_rowNo){
            episode_row.id = episode_row.id.replace(/\d+/, `${row_rowNo + 1}`);
            const new_attribute = episode_row.getAttribute("for").replace(/\d+/, `${row_rowNo + 1}`);
            episode_row.setAttribute("for", new_attribute);
        }
    });

    const episodeTableMenuBtn_elems = document.querySelectorAll(`[id*="episodeTableMenuBtn__rowNo"]`);

    episodeTableMenuBtn_elems.forEach(episode_row => {
        let row_id = episode_row.id;
        let row_rowNo = Number(row_id.match(/\d+/)[0]);

        // 追加行以降かチェック
        if(row_rowNo > target_rowNo){
            episode_row.id = episode_row.id.replace(/\d+/, `${row_rowNo + 1}`);
        }
    });



    // 追加する行要素
    let new_row_element = `
<div id="episodeTable__rowNo${target_rowNo+1}" class="episodeTable__rowWrapper">
    <div class="episodeTable__row">
        <div class="episodeTable__column -numItemAge">
                <input value="${target_age}" class="episodeTable__input" type="number" min="0" max="100" name="episode_g_0_r_${target_rowNo+1}_c_age" id="episode_g_0_r_${target_rowNo+1}_c_age">
        </div>
        <div class="episodeTable__column">
                <textarea class="episodeTable__textarea" row="2" name="episode_g_0_r_${target_rowNo+1}_c_episode" id="episode_g_0_r_${target_rowNo+1}_c_episode"></textarea>
        </div>
        <div class="episodeTable__column">
                <textarea class="episodeTable__textarea" row="2" name="episode_g_0_r_${target_rowNo+1}_c_emotion" id="episode_g_0_r_${target_rowNo+1}_c_emotion"></textarea>
        </div>
        <div class="episodeTable__column -numItemMotivation">
                <input value="${target_motivation}" class="episodeTable__input" type="number" min="0" max="100" name="episode_g_0_r_${target_rowNo+1}_c_motivation" id="episode_g_0_r_${target_rowNo+1}_c_motivation">
        </div>
        <div class="episodeTable__column">
                <textarea class="episodeTable__textarea" row="2" name="episode_g_0_r_${target_rowNo+1}_c_awareness" id="episode_g_0_r_${target_rowNo+1}_c_awareness"></textarea>
        </div>
        <div class="episodeTable__column episodeTable__btnWrapper">
            <input type="checkbox" id="episodeTableMenuBtn__rowNo${target_rowNo+1}" class="saguru__navInput" name="episodeTableMenuBtn">
            <label id="episodeTableMenuLavel__rowNo${target_rowNo+1}" class="episodeTableMenuLavel" for="episodeTableMenuBtn__rowNo${target_rowNo+1}"></label>
            <ul id="episodeTableMenu__rowNo${target_rowNo+1}">
                <li class="episodeTableMenuItem">
                    <button type="button" class="episodeTable__btn episodeTable__btn_delete">この行を削除</button>
                </li>
                <li class="episodeTableMenuItem">
                    <button type="button" class="episodeTable__btn episodeTable__btn_add">下に行を追加</button>
                </li>
            </ul>
        </div>
    </div>
</div>
    `

    // 200行まで取得したidの行要素直下に追加
    if(episode_rowWrapper_elems.length <= 200){
        const episode_target_row = document.getElementById(`episodeTable__rowNo${target_rowNo}`);
        episode_target_row.insertAdjacentHTML('afterend', new_row_element);

        update_episode_table();
        draw_chronology_chart_and_text();
    }
}



// ************************************************
//     @breief:  エピソード記入欄の選択行を削除する
//     @param[1]: クリックされた行の要素
//     @return: -
// ************************************************
export const delete_episode_new_row = (clickedElement) => {
    // ボタンが押された行のid名を取得する
    const clickedRowElement = clickedElement.parentNode.parentNode; // episodeTableMenuItem__rowNoXX
    let target_row = clickedRowElement.getAttribute("id");
    let target_rowNo = Number(target_row.split("rowNo")[1]);

    // 追加行以降の要素のidを全て1減らす
    const episode_row_elems = document.querySelectorAll(`[id*="episode_g_0_r_"]`);

    episode_row_elems.forEach(episode_row => {
        let row_id = episode_row.id;
        let row_rowNo = Number(row_id.match(/r_\d+/)[0].split("_")[1]);

        // 追加行以降かチェック
        if(row_rowNo > target_rowNo){
            episode_row.id = episode_row.id.replace(/r_\d+/, `r_${row_rowNo - 1}`);
            episode_row.name = episode_row.id.replace(/r_\d+/, `r_${row_rowNo - 1}`);
        }
    });
    
    const episode_rowWrapper_elems = document.querySelectorAll(`[id*="episodeTable__rowNo"]`);

    episode_rowWrapper_elems.forEach(episode_row => {
        let row_id = episode_row.id;
        let row_rowNo = Number(row_id.match(/\d+/)[0]);

        // 追加行以降かチェック
        if(row_rowNo > target_rowNo){
            episode_row.id = episode_row.id.replace(/\d+/, `${row_rowNo - 1}`);
        }
    });

    const episodeTableMenu_elems = document.querySelectorAll(`[id*="episodeTableMenu__rowNo"]`);

    episodeTableMenu_elems.forEach(episode_row => {
        let row_id = episode_row.id;
        let row_rowNo = Number(row_id.match(/\d+/)[0]);

        // 追加行以降かチェック
        if(row_rowNo > target_rowNo){
            episode_row.id = episode_row.id.replace(/\d+/, `${row_rowNo - 1}`);
        }
    });

    const episodeTableMenuLavel_elems = document.querySelectorAll(`[id*="episodeTableMenuLavel__rowNo"]`);

    episodeTableMenuLavel_elems.forEach(episode_row => {
        let row_id = episode_row.id;
        let row_rowNo = Number(row_id.match(/\d+/)[0]);

        // 追加行以降かチェック
        if(row_rowNo > target_rowNo){
            episode_row.id = episode_row.id.replace(/\d+/, `${row_rowNo - 1}`);
            const new_attribute = episode_row.getAttribute("for").replace(/\d+/, `${row_rowNo - 1}`);
            episode_row.setAttribute("for", new_attribute);
        }
    });

    const episodeTableMenuBtn_elems = document.querySelectorAll(`[id*="episodeTableMenuBtn__rowNo"]`);

    episodeTableMenuBtn_elems.forEach(episode_row => {
        let row_id = episode_row.id;
        let row_rowNo = Number(row_id.match(/\d+/)[0]);

        // 追加行以降かチェック
        if(row_rowNo > target_rowNo){
            episode_row.id = episode_row.id.replace(/\d+/, `${row_rowNo - 1}`);
        }
    });


    // 最後の1行以外の時はクリックされた行を削除
    if(episode_rowWrapper_elems.length > 1){
        const episode_target_row = document.getElementById(`episodeTable__rowNo${target_rowNo}`);
        episode_target_row.remove();

        update_episode_table();
        draw_chronology_chart_and_text();
    }

}