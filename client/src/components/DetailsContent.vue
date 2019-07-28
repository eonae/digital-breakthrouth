<template lang="pug">
  .details-content
    .row
      .col-title
        div Статус
      .col-content
        div
          span.marker
          | В работе
    .row
      .col-title
        div Отправитель
      .col-content 
        div ЗАО НПЦ "Дело Техники"

    .row
      .col-title
        div Курьер
      .col-content
        div Анатолий Аксёнов

    .row
      .col-title Время доставки
      .col-content.time 12.35

    .row
      .col-title Состояние
      .col-content

    .flex-cont
      .status ОК

</template>

<script>
export default {

}
</script>

<style>

  .details-content {
    margin: 0 !important;
    margin-top: 20px !important;
    padding: 10px;
  }
  .col-title {
    width: 40%;
    font-size: 1.2em;
  }
  .col-content {
    width: 60%;
    font-size: 1.6em;
  }
  .row {
    display: flex;
  }
  .row > div {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .marker {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: green;
    border-radius: 50%;
    margin-right: 15px;
  }
  .time {
    font-size: 2em !important;
    font-weight: 900;
    color: darkblue
  }

  .flex-cont {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .status {
    color: green;
    font-size: 7em;
    font-weight: 700;
    
  }


</style>
