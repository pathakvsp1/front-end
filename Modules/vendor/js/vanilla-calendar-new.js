/*
    Vanilla AutoComplete v0.1
    Copyright (c) 2019 Mauro Marssola
    GitHub: https://github.com/marssola/vanilla-calendar
    License: http://www.opensource.org/licenses/mit-license.php
*/
let VanillaCalendar = (function () {
    function VanillaCalendar(options) {
        function addEvent(el, type, handler){
            if (!el) return
            if (el.attachEvent) el.attachEvent('on' + type, handler)
            else el.addEventListener(type, handler);
        }
        function removeEvent(el, type, handler){
            if (!el) return
            if (el.detachEvent) el.detachEvent('on' + type, handler)
            else el.removeEventListener(type, handler);
        }
        let opts = {
            selector: null,
            datesFilter: false,
            pastDates: false,
            availableWeekDays: [],
            availableDates: [],
            date: new Date(),
            todaysDate: new Date(),
            button_prev: null,
            button_next: null,
            month: null,
            onSelect: (t, e) => calc(),
            month_label: null,
            // onSelect: (data, elem) => {},
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            shortWeekday: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' , 'Sun'],
        }
        for (let k in options) if (opts.hasOwnProperty(k)) opts[k] = options[k]
        
        let element = document.querySelector(opts.selector)
        if (!element)
            return
        
        const getWeekDay = function (day) {
            return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' , 'sunday'][day]
        }
        
        const createDay = function (date) {
            let newDayElem = document.createElement('div')
            let dateElem = document.createElement('span')
            dateElem.innerHTML = date.getDate()
            console.log(date.getDate())

            newDayElem.className = 'vanilla-calendar-date'
            newDayElem.setAttribute('data-calendar-date', date)
            
            let available_week_day = opts.availableWeekDays.filter(f => f.day === date.getDay() || f.day === getWeekDay(date.getDay()))
            let available_date = opts.availableDates.filter(f => f.date === (date.getFullYear() + '-' + String(date.getMonth() + 1).padStart('2', 0) + '-' + String(date.getDate()).padStart('2', 0)))
            // var temp = 0
            if (date.getDate() === 1) {
                newDayElem.style.marginLeft = (((date.getDay()) - 1) * 14.28 ) + '%'
                // This part to add
                if(newDayElem.style.marginLeft == "-14.28%"){
                    newDayElem.style.marginLeft = '86.2%'
                }
                console.log("New");
                console.log(newDayElem);
                
            }
            if (opts.date.getTime() <= opts.todaysDate.getTime() - 1 && !opts.pastDates) {
                newDayElem.classList.add('vanilla-calendar-date--disabled')
            } else {
                if (opts.datesFilter) {
                    if (available_week_day.length) {
                        newDayElem.classList.add('vanilla-calendar-date--active')
                        newDayElem.setAttribute('data-calendar-data', JSON.stringify(available_week_day[0]))
                        newDayElem.setAttribute('data-calendar-status', 'active')
                    } else if (available_date.length) {
                        newDayElem.classList.sadd('vanilla-calendar-date--active')
                        newDayElem.setAttribute('data-calendar-data', JSON.stringify(available_date[0]))
                        newDayElem.setAttribute('data-calendar-status', 'active')
                    } else {
                        newDayElem.classList.add('vanilla-calendar-date--disabled')
                    }
                } else {
                    newDayElem.classList.add('vanilla-calendar-date--active')
                    newDayElem.setAttribute('data-calendar-status', 'active')
                }
            }
            if (date.toString() === opts.todaysDate.toString()) {
                newDayElem.classList.add('vanilla-calendar-date--today')
            }
            
            newDayElem.appendChild(dateElem)
            opts.month.appendChild(newDayElem)
        }
        
        const removeActiveClass = function () {
            document.querySelectorAll('.vanilla-calendar-date--selected').forEach(s => {
                s.classList.remove('vanilla-calendar-date--selected')
            })
        }
        
        const selectDate = function () {
            let activeDates = element.querySelectorAll('[data-calendar-status=active]')
            activeDates.forEach(date => {
                date.addEventListener('click', function () {
                    removeActiveClass()
                    let datas = this.dataset
                    let data = {}
                    if (datas.calendarDate)
                        data.date = datas.calendarDate
                    if (datas.calendarData)
                        data.data = JSON.parse(datas.calendarData)
                    opts.onSelect(data, this)
                    this.classList.add('vanilla-calendar-date--selected')
                })
            })
        }
        
        const createMonth = function () {
            clearCalendar()
            let currentMonth = opts.date.getMonth()
            while (opts.date.getMonth() === currentMonth) {
                createDay(opts.date);
                // break;
                opts.date.setDate(opts.date.getDate() + 1)
            }
            
            opts.date.setDate(1)
            opts.date.setMonth(opts.date.getMonth() -1)
            opts.month_label.innerHTML = opts.months[opts.date.getMonth()] + ' ' + opts.date.getFullYear()
            selectDate()
        }
        
        const monthPrev = function () {
            opts.date.setMonth(opts.date.getMonth() - 1)
            createMonth()
        }
        
        const monthNext = function () {
            opts.date.setMonth(opts.date.getMonth() + 1)
            createMonth()
        }
        
        const clearCalendar = function () {
            opts.month.innerHTML = ''
        }
        
        const createCalendar = function () {
            document.querySelector(opts.selector).innerHTML = `
            <div class="vanilla-calendar-header">
                <button type="button" class="vanilla-calendar-btn" data-calendar-toggle="previous"><svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path></svg></button>
                <div class="vanilla-calendar-header__label" data-calendar-label="month"></div>
                <button type="button" class="vanilla-calendar-btn" data-calendar-toggle="next"><svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path></svg></button>
            </div>
            <div class="vanilla-calendar-week"></div>
            <div class="vanilla-calendar-body" data-calendar-area="month"></div>
            `
        }
        const setWeekDayHeader = function () {
            document.querySelector(`${opts.selector} .vanilla-calendar-week`).innerHTML = `
                <span>${opts.shortWeekday[0]}</span>
                <span>${opts.shortWeekday[1]}</span>
                <span>${opts.shortWeekday[2]}</span>
                <span>${opts.shortWeekday[3]}</span>
                <span>${opts.shortWeekday[4]}</span>
                <span>${opts.shortWeekday[5]}</span>
                <span>${opts.shortWeekday[6]}</span>
            `
        }
        
        this.init = function () {
            createCalendar()
            opts.button_prev = document.querySelector(opts.selector + ' [data-calendar-toggle=previous]')
            opts.button_next = document.querySelector(opts.selector + ' [data-calendar-toggle=next]')
            opts.month = document.querySelector(opts.selector + ' [data-calendar-area=month]')
            opts.month_label = document.querySelector(opts.selector + ' [data-calendar-label=month]')
            
            opts.date.setDate(1)
            createMonth()
            setWeekDayHeader()
            addEvent(opts.button_prev, 'click', monthPrev)
            addEvent(opts.button_next, 'click', monthNext)
        }
        
        this.destroy = function () {
            removeEvent(opts.button_prev, 'click', monthPrev)
            removeEvent(opts.button_next, 'click', monthNext)
            clearCalendar()
            document.querySelector(opts.selector).innerHTML = ''
        }
        
        this.reset = function () {
            this.destroy()
            this.init()
        }
        
        this.set = function (options) {
            for (let k in options)
                if (opts.hasOwnProperty(k))
                    opts[k] = options[k]
            createMonth()
//             this.reset()
        }
        
        this.init()
    }
    return VanillaCalendar
})()


    function slot(date,timezone)
    {
        
    var clienttimezone= Intl.DateTimeFormat().resolvedOptions().timeZone;
    var dateslot = date;
    var tm = $('#timezone :selected').text();
    
   // var tm=timezone;
    
    var staff_id= $('#staff_id').val();
    var service_id= $('#service_id').val();
    var service_id= $('#userid').val();
    var fromstaff= $('#fromstaff').val();
    var reschedulenote= $('#reschedulenote').val();
    
    $.ajaxSetup({
      headers: {
         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
        type: "POST",
        url: "/slots",             
        dataType: "json",
        data: {date:dateslot,clienttimezone:clienttimezone, 
            timezone:tm, 
            staff_id: $('#staff_id').val(),
            service_id: $('#service_id').val(),
            booking_id: $('#booking_id').val(),
            userid: $('#userid').val(),
        },
        success: function(response)
        {
            
        let events = document.querySelector('.events')
        events.innerHTML = "";
            //console.log(response);
            slots = response.slots;
            date=response.date;
            
            staff_serviceid=response.staff_serviceid;
             n = slots.length;
            staffid=response.staffid;
            clienttimezone=response.clienttimezone;
            booking_id=response.booking_id;
            userid=response.userid;
            timezone=response.timezone;
            
        for (let i = 0; i < n; i++) {
            var slotValue=slots[i];
            
            if(fromstaff!="true"){
            var html='<a href="javascript:void(0)" onClick="showBookingForm(\''+date+'\',\''+slotValue+'\',\''+timezone+'\',\''+staff_serviceid+'\',\''+staffid+'\',\''+clienttimezone+'\',\''+booking_id+'\',\''+userid+'\')" id='+i+'>'+slotValue+'</a>';
            }
            else{
                
                
            var html='<a href="javascript:void(0)" onClick="submitForm(\''+date+'\',\''+slotValue+'\',\''+timezone+'\',\''+staff_serviceid+'\',\''+staffid+'\',\''+clienttimezone+'\',\''+booking_id+'\',\''+userid+'\',\''+reschedulenote+'\')" id='+i+'>'+slotValue+'</a>';
            }
            $('.events').append(html);
        
        }


        },
        error: function(e){
            alert("Sorry, No slots available!");
        }

    });
    }
    
    function calc() {
        class Time {
            constructor(hh, mm) {
                this.h = hh;
                this.m = mm;
                this.mins = hh * 60 + mm;
            }
        }

        let buttons = document.querySelectorAll('.block');

        buttons.forEach(i => {
            i.addEventListener('click', () => {
                i.remove();
            })
        });
    };

function showBookingForm(date,slot,timezone,staff_serviceid,staffid,clienttimezone,booking_id,userid){
    
    $.ajax({
        type:'POST',
        url:'/showAppoitmentBookingForm',
        data:{date:date,timezone:timezone,slot:slot,serviceid:staff_serviceid,staffid:staffid,clienttimezone:clienttimezone,booking_id:booking_id,userid:userid},
        dataType: "json",
        success:function(data){
            
                         window.location.href = '/service/meeting/showAppointmentForm/'+data.slot+'/'+data.date+'/'+data.timezone+'/'+data.staff+'/'+data.service+'/'+data.clientimezone+'/'+data.booking_id+'/'+data.userid;
        },
        error: function(jqXhr, json, errorThrown){
            
              var errors = jqXhr.responseJSON;
              var errorsHtml = '';
              $.each(errors['errors'], function (index, value) {
                  errorsHtml += '<ul class="list-group"><li class="list-group-item alert alert-danger">' + value + '</li></ul>';
              });
          
              Swal.fire({
              title: "Error ",
              html: errorsHtml,
              width: 'auto',
              confirmButtonText: 'Ok',
              closeOnConfirm: true,
              closeOnCancel: true,
              type: 'error'
          });
          return false;
        }
  
  });
}
function submitForm(date,slot,timezone,staff_serviceid,staffid,clienttimezone,booking_id,userid,reschedulenote){
    
    $.ajax({
        type:'POST',
        url:'/rescheduleBookingInformation',
        data:{date:date,timezone:timezone,slot:slot,serviceid:staff_serviceid,staffid:staffid,clienttimezone:clienttimezone,booking_id:booking_id,reschedulenote:reschedulenote},
        dataType: "json",
        beforeSend: function(){
            $("#gif").show();
            
        },
        success:function(data){
            
                        $('#gif').hide(); 
                         window.location.href = '/getBookingDetails/'+data.id+'/'+data.meeting_uuid;
        },
        error: function(jqXhr, json, errorThrown){
            
              var errors = jqXhr.responseJSON;
              var errorsHtml = '';
              $.each(errors['errors'], function (index, value) {
                  errorsHtml += '<ul class="list-group"><li class="list-group-item alert alert-danger">' + value + '</li></ul>';
              });
          
          alert(errors);
          return false;
        }
  
  });
}

document.querySelector('#booknow').addEventListener('click', (e) => {
    if ($('.checked').filter(function(){  return $(this).find(':checked').length === 0 }).length > 0 ) {
        e.preventDefault();
        alert('At least 1 checkbox value must be checked');
       }
   
  });
    

window.VanillaCalendar = VanillaCalendar;
