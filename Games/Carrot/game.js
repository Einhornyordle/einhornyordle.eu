const pics = "Pics/";

var carrots = Number(localStorage.getItem("carrots" ?? 0));
var money = Number(localStorage.getItem("money") ?? 4);
var price = Number(localStorage.getItem("price") ?? 5);
var amount = Number(localStorage.getItem("amount") ?? 1);
var priceUp = Number(localStorage.getItem("priceUp") ?? 25);
var rewardUp = Number(localStorage.getItem("rewardUp") ?? 70);
var specialUp = Number(localStorage.getItem("specialUp") ?? 13);
var rewardMulti = Number(localStorage.getItem("rewardMulti") ?? 1);
var growrate = Number(localStorage.getItem("growrate") ?? 3000);
var rewardCooldown = Number(localStorage.getItem("rewardCooldown") ?? 30000);

var stats = document.getElementById("stats");
var payout = document.getElementById("payout");
var reward = document.getElementById("reward");

var priceUpText = document.getElementById("priceUpText");
var rewardUpText = document.getElementById("rewardUpText");
var specialUpText = document.getElementById("specialUpText");

var upgrades = [];

for (i = 1; i < 4; i++) {
  upgrades.push(document.getElementById("upgrade" + i));
  upgrades[i - 1].nr = i;
  upgrades[i - 1].addEventListener("click", function () {
    Upgrade(this);
  });
}

upgrades[2].state = Number(localStorage.getItem("upgradeState") ?? 0);

switch (upgrades[2].state) {
  case 2:
  case 4:
    upgrades[2].src = pics + "CarrotUp.png";
    break;
  case 1:
  case 3:
  case 5:
    upgrades[2].src = pics + "RewardTime.png";
    break;
  case 6:
    upgrades[2].src = pics + "Win.png";
    specialUp = 1e+9;
    break;
}

var fields = [];

for (i = 1; i < 10; i++) {
  fields.push(document.getElementById("field" + i));
  fields[i - 1].nr = i;
  fields[i - 1].state = Number(localStorage.getItem("field" + i) ?? -1);
  fields[i - 1].height = 64;
  fields[i - 1].width = 64;
  fields[i - 1].addEventListener("click", function () {
    Click(this);
  });
}

Update();

setInterval(GrowAndSave, growrate);

function Click(field) {
  if (field.state == -1) {
    if (money >= Math.pow(10, parseInt(field.nr - 1))) {
      money -= Math.pow(10, parseInt(field.nr - 1));
    } else {
      return;
    }
    field.state++;
  } else if (field.state == 0 && money > 2) {
    money -= 3;
    field.state++;
  } else if (field.state == 4) {
    field.state = 0;
    carrots += amount;
  } else if (upgrades[2].state >= 1 && field.state > 0 && field.state < 4) {
    field.state++;
  } else {
    return;
  }
  Update();
}

function Sell() {
  if (payout.style.filter == "") {
    money += price * carrots;
    carrots = 0;
    Update();
  }
}

function Upgrade(field) {
  switch (field.nr) {
    case 1:
      if (upgrades[0].style.filter == "") {
        money -= priceUp;
        price += parseInt(1 + (price / 6));
        priceUp += parseInt(priceUp / 5);
      }
      break;
    case 2:
      if (upgrades[1].style.filter == "") {
        money -= rewardUp;
        rewardMulti++;
        rewardUp += parseInt((3 * rewardUp) + (rewardUp / 3))
      }
      break;
    case 3:
      if (upgrades[2].style.filter == "") {
        money -= specialUp;
        specialUp += parseInt((8 * specialUp) + (specialUp / 8));
        switch (upgrades[2].state) {
          case 2:
          case 4:
            amount += 2;
            break;
          case 1:
          case 3:
          case 5:
            rewardCooldown -= 5000;
            break;
          case 6:
            if (confirm("Congratulations, you won! Do you want to continue playing?")) {
              specialUp = 0;
              Update();
            } else {
              localStorage.clear();
              location.reload();
            }
            return;
        }

        switch (upgrades[2].state) {
          case 1:
          case 3:
            upgrades[2].src = pics + "CarrotUp.png";
            break;
          case 0:
          case 2:
          case 4:
            upgrades[2].src = pics + "RewardTime.png";
            break;
          case 5:
            upgrades[2].src = pics + "Win.png";
            specialUp = 1e+9;
            break;
        }

        if (upgrades[2].state < 6) {
          upgrades[2].state++;
        }
        break;
      }
  }
  Update();
}

function Reward() {
  if (reward.style.filter == "") {
    reward.style.filter = "grayscale(100%)";
    var val = parseInt(Math.random() * 10 * rewardMulti)

    if ((Math.random() * 10) < 6) {
      money += val;
    } else {
      carrots += val;
    }
    setTimeout(function () {
      reward.style.filter = "";
    }, rewardCooldown);
    Update();
  }
}

function GrowAndSave() {
  for (i = 1; i < 10; i++) {
    if (fields[i - 1].state > 0 && fields[i - 1].state < 4) {
      fields[i - 1].state++;
    }
  }
  Update();
  Save();
}

function Update() {
  stats.innerHTML = "<img class='icon' src='" + pics + "Carrot.png'> " + carrots + "<br>" + "<img class='icon' src='" + pics + "Coin.png'> " + money;

  priceUpText.innerHTML = priceUp + "c";
  rewardUpText.innerHTML = rewardUp + "c";
  specialUpText.innerHTML = specialUp + "c";

  if (carrots > 0) {
    payout.style.filter = "";
  } else {
    payout.style.filter = "grayscale(100%)";
  }

  if (money < priceUp) {
    upgrades[0].style.filter = "grayscale(100%)";
  } else {
    upgrades[0].style.filter = "";
  }

  if (money < rewardUp) {
    upgrades[1].style.filter = "grayscale(100%)";
  } else {
    upgrades[1].style.filter = "";
  }

  for (i = 0; i < 9; i++) {
    if (fields[i].state > 0) {
      fields[i].src = pics + "Carrot" + amount + fields[i].state + ".png";
    } else {
      fields[i].src = pics + "Carrot" + fields[i].state + ".png";
    }
  }

  if (upgrades[2].state == 6) {
    for (i = 0; i < 9; i++) {
      if (fields[i].state != 4) {
        upgrades[2].style.filter = "grayscale(100%)";
        return;
      }
    }
  }
  if (money < specialUp) {
    upgrades[2].style.filter = "grayscale(100%)";
  } else {
    upgrades[2].style.filter = "";
  }
}

function Save() {
  localStorage.setItem("carrots", carrots);
  localStorage.setItem("money", money);
  localStorage.setItem("price", price);
  localStorage.setItem("amount", amount);
  localStorage.setItem("priceUp", priceUp);
  localStorage.setItem("rewardUp", rewardUp);
  localStorage.setItem("specialUp", specialUp);
  localStorage.setItem("rewardMulti", rewardMulti);
  localStorage.setItem("growrate", growrate);
  localStorage.setItem("rewardCooldown", rewardCooldown);
  localStorage.setItem("upgradeState", upgrades[2].state);
  for (i = 1; i < 10; i++) {
    localStorage.setItem("field" + i, fields[i - 1].state);
  }
}