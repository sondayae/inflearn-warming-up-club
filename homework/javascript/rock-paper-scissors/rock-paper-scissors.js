function init() {

    const buttons = document.querySelectorAll('.selectArea button');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            game.start(e.currentTarget.value);
        });
    });

    const restartButton = document.querySelector('#restart');
    restartButton.addEventListener('click', () => {
        game.restart();
    });


}

const game = (() => {
    let count = 5;
    let playerWin = 0;
    let computerWin = 0;

    const match = (playerSelect) => {
        if (count > 0) {
            const computerSelect = Math.floor(Math.random() * 3) + 1;
            const abs = Math.abs(playerSelect - computerSelect);
            if (abs == 1) {
                playerSelect > computerSelect ? playerWin++ : computerWin++;
            } else if (abs == 2) {
                playerSelect < computerSelect ? playerWin++ : computerWin++;
            } else {
                console.log('비겼습니다');
            }
        } else {
            renderWinner();
        }
        renderCount();
    };
    const renderCount = () => {
        document.querySelector('#tryCount').textContent = count;
        document.querySelector('#computerWin').textContent = computerWin;
        document.querySelector('#playerWin').textContent = playerWin;
    }
    const renderWinner = () => {
        let winnerMessage = '';
        if (playerWin > computerWin) {
            winnerMessage = '플레이어가 이겼습니다';
        } else if (playerWin < computerWin) {
            winnerMessage = '컴퓨터가 이겼습니다';
        } else {
            winnerMessage = '비겼습니다';
        }

        document.querySelector('#winMsg').textContent = winnerMessage;
        document.querySelector('#winMsg').classList.remove('hide');
        document.querySelector('#restart').classList.remove('hide');
    }

    const reset = () => {
        count = 5;
        playerWin = 0;
        computerWin = 0;
        document.querySelector('#restart').classList.add('hide');
        document.querySelector('#winMsg').classList.add('hide');
        renderCount();
    }

    renderCount();

    return {
        start: (playerSelect) => {
            if (count > 0) {
                --count;
                match(playerSelect);
            }
        },
        restart: () => {
            reset();
        }
    }
})();