////////////// Settings JS /////////////////////////////

const tabNavListSettings = document.querySelectorAll('.profile-control');
const tabBodySettings = document.querySelectorAll('.rows');

tabNavListSettings[0].classList.add('active');

var current_link = window.location.href;

//  /staff/info/staffSetting#login

if (current_link.includes("#tab2"))
{   
  tabNavListSettings[0].classList.remove('active');
    tabBodySettings[1].classList.add('active');
    tabBodySettings[0].classList.remove('active');
    tabBodySettings[2].classList.remove('active');
    tabNavListSettings[1].classList.add('active');
}

//  /staff/info/staffSetting#plans
  
if (current_link.includes("#tab3"))
{   
  tabNavListSettings[0].classList.remove('active');
    tabBodySettings[1].classList.add('active');
    tabBodySettings[0].classList.remove('active');
    tabBodySettings[2].classList.remove('active');
    tabNavListSettings[2].classList.add('active');
}
  

tabNavListSettings.forEach((item, index, listArray) => {
    item.addEventListener('click', () => {

        if (item.classList.contains('active')) {
            return;
        } else {
            document.querySelector('.active').classList.remove('active');
            item.classList.add('active');
        }

        // if (current_link.includes("#login"))
        // {
        //    listArray[1].classList.contains('active')
        // }
  

        if (listArray[0].classList.contains('active')) {
            tabBodySettings[0].classList.add('active');
            tabBodySettings[1].classList.remove('active');
            tabBodySettings[2].classList.remove('active');
	    
        }
        if (listArray[1].classList.contains('active')) {
            tabBodySettings[1].classList.add('active');
            tabBodySettings[0].classList.remove('active');
            tabBodySettings[2].classList.remove('active');
        }
        if (listArray[2].classList.contains('active')) {
            tabBodySettings[2].classList.add('active');
            tabBodySettings[0].classList.remove('active');
            tabBodySettings[1].classList.remove('active');
        }
    })
})


