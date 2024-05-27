

$(function() {

    init();

	$(document).on("click",".time-wrap .sel-box > a", function(e) {
        if ( $(e.target).hasClass('info-more') ) return false;

 		$("#reservtime").val($(this).text().trim());       
        $('.time-wrap .sel-box > a').removeClass('on');
        $(this).addClass('on');
    })

    /*
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month  + '-' + day;
	var date=new Date($("#datepicker1").datepicker({dateFormat:"yy-mm-dd"}).val());
	
	getDays(dateString, title, date.getDay());
	week = date.getDay();
    */
});

function init() {
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        dayNames: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        showMonthAfterYear: true,
        yearSuffix: '년',
        showOtherMonths: true,
        selectOtherMonths: true
    });
    $( "#datepicker1" ).datepicker({firstDay : 0});
    $( "#datepicker1" ).datepicker('option', 'minDate', '0');

    // 비활성화할 날짜 배열
    var unavailableDates = ["2023-11-18", "2023-11-22"]; // 휴무
    var fullyBookedDates = ["2023-11-23", "2023-11-24"]; // 예약마감

    function highlightRedDates(date) {
        var day = date.getDay();
        if (day === 0 || day === 6) {
          return [false];
        }

        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        if (fullyBookedDates.indexOf(string) != -1) {
            return [false, "fully-booked"];
        }         
        if (unavailableDates.indexOf(string) != -1) {
            return [false, " ui-state-disabled"];
        } 
        return [true];
    }

    $('#datepicker1').multiDatesPicker({
        beforeShowDay: highlightRedDates,
        onSelect: function(dateText, info) {  
            $("#reservdate").val(dateText);
            $(this).multiDatesPicker('resetDates');
        }
    });
}

// 서구 체육관 프로젝트 예약 캘린더에서 사용하던 소스 참고용으로 붙여놨습니다. 
// 필요없으시면 지워주세요.
// http://seogusports.sanggong.net:1007/request/view.php?no=68 
function getDays(rentaldate, title, week){
    $.ajax({
        url : 'getlist.php',
        type : 'GET',
        dataType : 'JSON',
        data : {'rentaldate' : rentaldate, 'title' : title, 'week' : week},
        success : function(data){
            //console.log(data);
            var data_arr = data;
            var htmlcon="";

            JSON.parse(basic_data).forEach(function(data, idx){
                htmlcon += "<li>";
                htmlcon +=	"<a href='javascript:;' class='";
                data_arr.forEach(function(data_arr, idx1){
                    if(data_arr.rentaltime==data.rentaltime){
                        htmlcon += " non"; // 띄어쓰기 필요
                    }
                });

                if(week=="0" || week=="6"){
                    if(data.rentaltime=="06:00 ~ 07:00" || data.rentaltime=="07:00 ~ 08:00" || data.rentaltime=="08:00 ~ 09:00" || data.rentaltime=="20:00 ~ 21:00" || data.rentaltime=="21:00 ~ 22:00"){
                        htmlcon += " non"; // 띄어쓰기 필요
                    }
                }

                htmlcon +=	"'>"+data.rentaltime+"</a>";
                htmlcon += "</li>";
            });

            $('.time_list').html(htmlcon);		
        },
        error: function(err){ 
            console.log(err);
        }
    });
}
