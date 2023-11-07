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
    let len_episode_cells = episode_cells.length;

    episode_data_array = get_episode_column_data_array(episode_cells);

    // 各セルにイベント追加
    for(let num = 0; num < len_episode_cells; num++){
        // セルのテキストが変更された場合
        episode_cells[num].addEventListener('input', () => {
            // テキストの入力可能行数を制限
            limit_textarea_lines(episode_cells[num]);
            limit_input_range(episode_cells[num]);

            let row_num = Math.floor(num / header_episode.length);
            let col_num = num % header_episode.length;

            // モチベーションチャートへ渡す配列の更新
            episode_data_array[col_num][row_num] = episode_cells[num].value;

            // モチベーションチャート描画更新
            draw_chronology_chart_and_text();
        });
    }
}


// ************************************************
//     @breief:  エピソード記入欄で入力したデータ列ごとの配列に分解する
//     @param[1]: エピソード記入欄のinput/textareaオブジェクト
//     @return: 各列のデータが格納された配列
// ************************************************
export const get_episode_column_data_array = (episode_cell_datas) => {
    let len_episode_cell_datas = episode_cell_datas.length;
    let age_array = [];
    let episode_array = [];
    let emotion_array = [];
    let motivation_array = [];
    let awareness_array = [];

    // チャート作成に必要なデータを各配列へ抜き出し
    for(let cell_num=0; cell_num < len_episode_cell_datas; cell_num++){
        switch (cell_num % header_episode.length) {
            case header_episode.age:
                age_array.push(episode_cell_datas[cell_num].value);
                break;
            case header_episode.episode:
                episode_array.push(episode_cell_datas[cell_num].value);
                break;
            case header_episode.emotion:
                emotion_array.push(episode_cell_datas[cell_num].value);
                break;
            case header_episode.motivation:
                motivation_array.push(episode_cell_datas[cell_num].value);
                break;
            case header_episode.awareness:
                awareness_array.push(episode_cell_datas[cell_num].value);
                break;
            default:
                console.log("不正な値");
                break;
        }
    }

    return [age_array, episode_array, emotion_array, motivation_array, awareness_array];
}


// ************************************************
//     @breief:  エピソード記入欄に新規行を追加する
//     @param[1]: クリックされた行の要素
//     @return: -
// ************************************************
export const add_episode_new_row = (clickedElement) => {
    // ボタンが押された行のid名を取得する
    const clickedRowElement = clickedElement.parentNode.parentNode; // episodeTable__rowWrapper
    let target_row = clickedRowElement.getAttribute("id");
    let target_rowNo = Number(target_row.split("rowNo")[1]);
    let target_motivation = 50;
    let target_age = document.getElementById(`episode_g_0_r_${target_rowNo}_c_age`).getAttribute("value");


    // 追加行以降の要素のidを全て1ずらす
    const episode_row_elems = document.querySelectorAll(`[id*="episode_g_0_r_"]`);

    episode_row_elems.forEach(episode_row => {
        let row_id = episode_row.id;
        let row_rowNo = Number(row_id.match(/r_\d+/)[0].split("_")[1]);

        // 追加行以降かチェック
        if(row_rowNo > target_rowNo){
            episode_row.id = episode_row.id.replace(/r_\d+/, `r_${row_rowNo + 1}`);
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
    </div>
    <div class="episodeTable__btnWrapper">
        <button type="button" class="episodeTable__btn">追加</button>
    </div>
</div>
    `

    // 取得したidの行要素直下に追加
    const episode_target_row = document.getElementById(target_row);
    episode_target_row.insertAdjacentHTML('afterend', new_row_element);
}