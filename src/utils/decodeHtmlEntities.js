export default function decodeHtmlEntities (htmlString){
    if (!htmlString) return ""; 
    if (typeof document !== 'undefined') {
        try {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlString;
            let text = (tempDiv.textContent || tempDiv.innerText || "");
            return text.replace(/&nbsp;/g, ' ').trim(); 
        } catch (e) {
            console.error("Feil ved stripping av HTML:", e);
            return htmlString.replace(/(<([^>]+)>)/gi, "").trim();
        }
    } else {
        return htmlString.replace(/(<([^>]+)>)/gi, "").trim();
    }
}