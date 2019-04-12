

export default function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.href.split('?')[1].match(reg);

    return r != null?window.decodeURIComponent( r[2] ) :null;
}

