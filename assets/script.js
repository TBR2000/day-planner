var today = moment();
$("#current-date").text(today.format("Do MMM, YYYY"));
const now = moment().format('MMMM Do YYYY');
let nowHour24 = moment().format('H');
let nowHour12 = moment().format('h');
let $plannerDiv = $('#time-block');
let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

if (storedPlans !== null) {
  planTextArr = storedPlans;
}else {planTextArr = new Array(9);}

// clear elements
$plannerDiv.empty();

 // build calendar by hours
 for (let hour = 9; hour <= 17; hour++) {
    // array use offset from hour
    let index = hour - 9;
    
    //row components
    let $rowDiv = $('<div>');
    $rowDiv.addClass('present')
    $rowDiv.attr('hour-index',hour);
    $rowDiv.attr('style', 'display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;')
    //$rowDiv.attr()

  
    //Time box of row
    let $col2Time = $('<div>');
    $col2Time.addClass('col-md-2');
  
    // create hour 
    const $hourSpn = $('<span>');
    $hourSpn.attr('class','present');
    $hourSpn.attr('style','border-top: 1px dashed #000000; height:100%; width: 100%; text-align: center; border-radius: 15px 0px 0px 15px; display: inline-block; font-size: 2em;');
    
    // format hours for display
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    // populate hour
    $hourSpn.text(`${displayHour} ${ampm}`);

    // inset hour
    $rowDiv.append($col2Time);
    $col2Time.append($hourSpn);
    
    // build row components
    let $dailyPlanSpn = $('<input>');

    $dailyPlanSpn.attr('id',`input-${index}`);
    $dailyPlanSpn.attr('hour-index',index);
    $dailyPlanSpn.attr('class','present')
    $dailyPlanSpn.attr('type','text');
    $dailyPlanSpn.attr('style', 'height:100%; width: 100%; margin-top: 2px margin-bottom: 2px; font-size: 1em; line-height: 1.5; border-radius: 15px;white-space: pre-wrap;border-top: 1px solid white;font-size: 1em;line-height: 1.5;border-radius: 15px;');

   

    // access index from data array for hour 
    $dailyPlanSpn.val( planTextArr[index] );
    
    // create col to control width
    let $col9IptDiv = $('<div>');
    $col9IptDiv.addClass('col-md-9');


    // add col width and row component to row
    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlanSpn);

      //save of row
      let $col1Save = $('<div>');
      $col1Save.addClass('col-md-1');
  
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"saveBtn; fas fa-save fa-spin fa-3x");
     
      
      // add col width and row component to row
      $rowDiv.append($col1Save);
      $col1Save.append($saveBtn);
       
      //color based on time
      if ( hour < nowHour24) {
        $hourSpn.attr('class','past');
        $rowDiv.attr('class',' past')
        $dailyPlanSpn.attr('class','past');

      } else if ( hour > nowHour24) {
        $hourSpn.attr('class','future');
        $rowDiv.attr('class',' future')
        $dailyPlanSpn.attr('class','future');

      };
      console.log(hour, nowHour24)
      // add row 
      $plannerDiv.append($rowDiv);
    };

  $(document).on('click','i', function(event) {
    event.preventDefault(); 
    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;

    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });  