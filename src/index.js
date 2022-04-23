const axios = require('axios').default;
const sleep = (ms) => (new Promise(resolve => setTimeout(resolve, ms)));

$(function(){

    async function renderResult($card, result){
        const $result = $('.slice-sm > .container .row > div:last .card', $(result.data));
        $('.loader', $card).remove();
        $card.append($result);
    }

    async function renderError($card, endpoint){
        $('.loader', $card).remove();
        $tryAgain = $(`<a class="text-danger tryagain btn btn-styled btn-circle" href="${endpoint}">Error. Click here to try again</a>`)
        $card.append($tryAgain);
        $tryAgain.on('click', async function(e){
            e.preventDefault();
            $('.tryagain', $card).remove();
            await fetchResult($card, endpoint);
        })
    }

    async function fetchResult($card, endpoint) {
        try {
            $card.append($('<div class="loader" style="margin: 0 10px; text-align:center"><img src="https://cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif" /></div>'));           
            const result = await axios.get(endpoint)
            renderResult($card, result)
        } catch(e) {
            renderError($card, endpoint)
        }
    }

    const $cards = $('.main-content .row .card');
    $cards.each(async function(i, $el) {
        const endpoint = $('.card-image > a', $(this)).get(0).href;
        await sleep(i*100);
        await fetchResult($(this), endpoint);
    });

})();