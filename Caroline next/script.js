$(document).ready(function () {
    /*
     * Main variables
     */
    var content = [{
        title: "I Have A Crush On You!!",
        desc: ""
    }, {
        title: "I Have A Crush On You!!",
        desc: "Mungkin itu sebuah kalimat yang cukup simple, kalimat yang menyimpan banyak harapan juga keraguan dibaliknya. Ada harapan yang ingin rasa suka itu tidak jatuh sendirian, juga ada yang harus disiapkan agar bisa menerima konsekuensinya."
    }, {
       title: "",
       desc: "Menyatakan perasaan itu adalah hal yang cukup serius, banyak yang akan dikorbankan termasuk hasil akhirnya melepas hal yang sudah Iama tersimpan itu cukup melegakan dan bukan hal yang mudah. Disini aku cuman mau ungkapin perasaan aku sama Olin, tentang diterima atau engga itu semua ada di Olin"
    }, {
        title: "",
        desc: "Aku sadar bahwa aku tidak sebaik pria yang Olin idamkan dan tidak sebaik dengan pria lain yang sedang memperjuangkan Olin. Aku hanya ingin mengungkapkan apa yang aku rasakan terhadap Olin. Aku tau kekurangan ku, tapi dengan kekurangan ku itu aku tidak menutup niat baik ku pada mu."
    }, {
        title: "",
        desc: "Kalau Olin risih bilang yahh,semisal Olin udah punya pacar maaf yaa karna udah confess ke Olin tiba tiba gini...mungkin segitu saja dari ku,hehe makasih yaa sudah mau dibaca."
    }, {
        title: "",
        desc:  "Aku mohon pada Olin, untuk merahasiakan ini dari teman del ya Olin. Cukup Olin aja yang tau tentang pesan ini. Ini pesan spesial untuk Olin. Aku minta maaf baru bisa confess dari pesan ini."
    }, {
        title: "",
        desc: "Kalau Olin ga suka dengan semua tindakan ku ini, tolong jangan jadi benci pada ku ya Olin."
    }, {
        title: "I Have A Crush On You!!",
        desc: "Aku sangat menunggu respon kembali dari Olin♡"
    },  {
        title: "Terakhir",
        desc: "Tekan tombol diatas"
        
 }];
    var currentPage = 0;
    //generate content
    for (var i = 0; i < content.length; i++) {
        //split content letters to array
        for (var obj in content[i]) {
            //if string
            if (typeof content[i][obj] === "string") {
                content[i][obj] = content[i][obj].split("");
                continue;
            }
            //if array (grouped text)
            else if (typeof content[i][obj] === "object") {
                var toPush = [];
                for (var j = 0; j < content[i][obj].length; j++) {
                    for (var k = 0; k < content[i][obj][j].length; k++) {
                        toPush.push(content[i][obj][j][k]);
                    }
                }
                content[i][obj] = toPush;
            }
        }
        //set text to 
        $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
        //clone to data
        $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
    }
    //initial arrangement
    arrangeCurrentPage();
    scrambleOthers();
    /*
     * Event handlers
     */
    $(window).resize(function () {
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-prev").hide();
    $("#soup-prev").click(function () {
        $("#soup-next").show();
        currentPage--;
        if (currentPage === 0) {
            $("#soup-prev").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-next").click(function () {
        $("#soup-prev").show();
        currentPage++;
        if (currentPage === content.length - 1) {
            $("#soup-next").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    /*
     * Functions
     */
    function arrangeCurrentPage() {
        for (var i = 0; i < content[currentPage].title.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
        for (var i = 0; i < content[currentPage].desc.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
    }

    function setText() {
        var j;
        for (j = 0; j < content[i].title.length; j++) {
            $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
        }
        for (j = 0; j < content[i].desc.length; j++) {
            $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
        }
    }

    function scrambleOthers() {
        for (var i = 0; i < content.length; i++) {
            //don't scramble currentPage
            if (currentPage === i)
                continue;
            var parts = [
                ["title", ".soup-title"],
                ["desc", ".soup-desc"]
            ];
            //apply to .title h1s and .desc ps
            for (var j = 0; j < parts.length; j++) {
                for (var k = 0; k < content[i][parts[j][0]].length; k++) {
                    //define random position on screen
                    var randLeft = Math.floor(Math.random() * $(window).width());
                    var randTop = Math.floor(Math.random() * $(window).height());
                    //defining boundaries
                    var offset = $(".position-data").eq(currentPage).offset();
                    var bounds = {
                        left: offset.left,
                        top: offset.top,
                        right: $(window).width() - offset.left,
                        bottom: $(window).height() - offset.top
                    };
                    var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
                    var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
                    //finally, apply all the scrambles
                    $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
                        left: randLeft,
                        top: randTop,
                        color: "#DDD",
                        zIndex: "initial"
                    });
                }
            }
        }
    }
});