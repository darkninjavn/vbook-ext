function execute(url) {
    url = url.replace("truyengihotne.com")
    let doc = fetch(url).html();
    let el = doc.select("#episode_list li a");
    let data = [];
    for (let i = el.size() - 1; i >= 0; i--) {
        let e = el.get(i);
        data.push({
            name: e.select('.no').text(),
            url: e.attr("href"),
            host: "https://truyengihotne.com"
        })
    }
    return Response.success(data);
}
