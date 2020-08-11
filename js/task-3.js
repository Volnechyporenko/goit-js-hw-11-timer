class CountdownTimer {
  constructor(setting) {
    this.setting = setting;
    this.period = 0;
    this.timer = null;
  }
  start() {
    this.period = Date.now() - setting.targetDate;
    this.timer = setInterval(() => {
      this.period = this.period - 1000;
      this.updateInterface(this.period);
    }, 1000);
  }

  checkForEnd(time) {
    if (Math.floor(time / 1000) <= 0) {
      clearInterval(this.timer);
    }
  }

  updateInterface(time) {
    this.checkForEnd(time);

    const timerRef = document.querySelector(this.setting.selector);

    const refs = {
      days: timerRef.querySelector('.value[data-value="days"]'),
      hours: timerRef.querySelector('.value[data-value="hours"]'),
      mins: timerRef.querySelector('.value[data-value="mins"]'),
      secs: timerRef.querySelector('.value[data-value="secs"]'),
    };
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    refs.days.textContent = this.pad(days);
    refs.hours.textContent = this.pad(hours);
    refs.mins.textContent = this.pad(mins);
    refs.secs.textContent = this.pad(secs);
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const setting = {
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2019"),
};
const countDownTimer = new CountdownTimer(setting);

countDownTimer.start();
