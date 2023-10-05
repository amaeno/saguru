import {add_child_object} from "./common";


const id_canvas = "chronologyChart";
const id_chronology_text = "chronologyText";

const class_item = "chronologyEpisodeList__item";
const class_item_age = "chronologyEpisodeList__itemAge";
const class_item_text = "chronologyEpisodeList__itemText";


const canvas_mergin_y = 5;
const canvas_mergin_x = 50;
const axis_mergin_x = 10;


// ************************************************
//     @breief:  モチベーションチャートをcanvasに描画する
//     @param[1]:  モチベーション値
//     @return: -
// ************************************************
export const draw_chronology_chart = (motivation_array) => {
    const canvas = document.getElementById(id_canvas);

    const canvas_width = canvas.clientWidth;
    const canvas_height = canvas.clientHeight;
    let chart_height = canvas_height - (canvas_mergin_y * 2);


    // エピソード欄の横幅
    const item_width = 71;
    // エピソード欄の中央線のまでの幅
    const item_center = Math.ceil(item_width/2);

    // ドット1セルに当たるピクセル数
    const cell_height = Math.ceil(chart_height / 100);

    let motivation_dot_array = [];


    // CSSで設定した要素サイズに描画サイズ合わせる
    canvas.setAttribute( "width" , canvas_width );
    canvas.setAttribute( "height" , canvas_height );

    // canvasに対応していない場合は何もしない
    if ( ! canvas || ! canvas.getContext ) {
        return false;
    }
    const context = canvas.getContext('2d');

// 描画処理 ========================
    draw_axis(context, canvas_width + canvas_mergin_x, chart_height + canvas_mergin_y, cell_height);

    for(let i=0; i < motivation_array.length; i++){
        draw_dash_line(context, item_center + (item_width * i) + (canvas_mergin_x + axis_mergin_x), canvas_mergin_y , item_center + (item_width * i) + (canvas_mergin_x + axis_mergin_x), chart_height + canvas_mergin_y );
        draw_dot(context, item_center + (item_width * i) + (canvas_mergin_x + axis_mergin_x), (chart_height - (motivation_array[i]*cell_height)) + canvas_mergin_y , 6);        
    
        // 描画したドットの座標を保存
        motivation_dot_array.push([item_center + (item_width * i) + (canvas_mergin_x + axis_mergin_x), (chart_height - (motivation_array[i]*cell_height) + canvas_mergin_y)]);
    }

    draw_chart(context, motivation_dot_array);
}



// ************************************************
//     @breief:  破線を描画する
//     @param[1]:  canvasのcontext
//     @param[2]:  始点のx座標
//     @param[3]:  始点のy座標
//     @param[4]:  終点のx座標
//     @param[5]:  終点のy座標
//     @return: -
// ************************************************
const draw_dash_line = (context, x1, y1, x2, y2) => {
    context.beginPath();
        context.lineWidth = 1;
        context.setLineDash([3, 3])
        context.strokeStyle = "#cccccc";
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
    context.closePath();

    context.stroke();
}


// ************************************************
//     @breief:  円を描画する
//     @param[1]:  canvasのcontext
//     @param[2]:  中心x座標
//     @param[3]:  中心y座標
//     @param[4]:  半径
//     @return: -
// ************************************************
const draw_dot = (context, x, y, r) => {
    context.beginPath();
        context.arc( x, y, r, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
        context.fillStyle = "#ff0000";
        context.strokeStyle = "rgba(255,0,0,0)";
    context.fill();

    context.stroke();
}


// ************************************************
//     @breief:  折れ線グラフを描画する
//     @param[1]:  canvasのcontext
//     @param[2]:  座標が格納された配列
//     @return: -
// ************************************************
const draw_chart = (context, dot_array) => {
    // 直線の数は(座標の数 - 1)
    let line_num = dot_array.length - 1;

    for(let i=0; i < line_num; i++){
        context.beginPath();
            context.lineWidth = 3;
            context.setLineDash([]) // 実線に戻す
            context.strokeStyle = "rgba(255,0,0,1)";
            context.moveTo(dot_array[i][0], dot_array[i][1]);
            context.lineTo(dot_array[i+1][0], dot_array[i+1][1]);
        context.closePath();


        context.stroke();
    }
}


// ************************************************
//     @breief:  グラフの軸を描画する
//     @param[1]:  canvasのcontext
//     @param[2]:  横軸軸の長さ
//     @param[3]:  縦軸の長さ
//     @param[4]:  1セル相当の長さ
//     @return: -
// ************************************************
const draw_axis = (context, width, height, cell_height) => {

    let scale_long = 15;
    let scale_short = 7;

    // 縦線
    context.beginPath();
        context.lineWidth = 2;
        context.setLineDash([]) // 実線に戻す 
        context.strokeStyle = "#aaaaaa";
        context.moveTo(canvas_mergin_x, canvas_mergin_y);
        context.lineTo(canvas_mergin_x, height);
    context.closePath();

    context.stroke();

    // メモリ
    for(let i=0; i <= 10; i++){
        context.beginPath();
            context.lineWidth = 2;
            context.setLineDash([]) // 実線に戻す 
            context.strokeStyle = "#aaaaaa";
            // 10刻み
            context.moveTo(canvas_mergin_x, (i * cell_height * 10) + canvas_mergin_y );
            if ((i === 0) || (i === 5) || (i === 10)) {
                context.lineTo(canvas_mergin_x + scale_long, (i * cell_height * 10) + canvas_mergin_y );

                // 数値
                context.font = '10pt YuGothic,"Yu Gothic",sans-serif';
                context.fillStyle = '#000000';
                context.textAlign = 'right';
                context.textBaseline = 'middle';
                context.fillText((100 - (i * 10)), canvas_mergin_x - 5, (i * cell_height * 10) + canvas_mergin_y );
            }
            else {
                context.lineTo(canvas_mergin_x + scale_short, (i * cell_height * 10) + canvas_mergin_y );
            }
            
        context.closePath();

        context.stroke();
    }

    // 横線
    context.beginPath();
        context.lineWidth = 1;
        context.setLineDash([]) // 実線に戻す 
        context.strokeStyle = "#000000";
        context.moveTo(canvas_mergin_x + scale_long + 7, (cell_height * 50) + canvas_mergin_y );
        context.lineTo(canvas_mergin_x + scale_long + 7 + width, (cell_height * 50) + canvas_mergin_y );
    context.closePath();

    context.stroke();
}



// ************************************************
//     @breief:  エピソードのテキストを生成する
//     @param[1]:  年齢
//     @param[2]:  エピソードテキスト
//     @return: -
// ************************************************
export const draw_chronology_text = (age, text) => {
    const chronology_text_list = document.getElementById(id_chronology_text);

    // リストコンテナ
    const chronology_text_item = add_child_object(chronology_text_list, "li");
    chronology_text_item.className = class_item;

    // 年齢
    const chronology_text_item_age = add_child_object(chronology_text_item, "p");
    chronology_text_item_age.className = class_item_age;
    chronology_text_item_age.textContent = String(age);

    // エピソードテキスト
    const chronology_text_item_text = add_child_object(chronology_text_item, "p");
    chronology_text_item_text.className = class_item_text;
    chronology_text_item_text.textContent = text;
}
