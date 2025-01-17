function execute(url, page) {
    const cat = url.split('/').pop();
    if (!page) page = 0;
    const doc = Http.post('https://fastmanhwa.net/wp-admin/admin-ajax.php').params({
        "action": "madara_load_more",
        "page": page,
        "template": "madara-core/content/content-archive",
        "vars[orderby]": "meta_value_num",
        "vars[paged]": "1",
        "vars[posts_per_page]": "20",
        "vars[post_type]": "wp-manga",
        "vars[post_status]": "publish",
        "vars[meta_key]": "_latest_update",
        "vars[wp-manga-genre]": cat,
        "vars[manga_archives_item_layout]": "big_thumbnail"
    }).html()
    const data = [];
    var el = doc.select(".page-listing-item .page-item-detail")
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i)
        data.push({
            name: e.select("h3.h5 a").first().text(),
            link: e.select("h3.h5 a").first().attr("href"),
            cover: e.select(".item-thumb img").first().attr("src"),
            description: e.select(".list-chapter > div:nth-child(1) > span.chapter a").text(),
            host: "https://fastmanhwa.net"
        })
    }

    return Response.success(data, parseInt(page) + 1)
}