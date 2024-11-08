function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = page.id === pageId ? "block" : "none";
    });
}