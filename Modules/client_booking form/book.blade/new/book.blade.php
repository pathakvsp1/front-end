<!-- Booking Form - Step 4 -->

<!-- HAHA -->

@extends('layouts.frontend_layout')
@section('content')

<style>
  #loading{
    display: none;  
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1100%;
    background: rgba(250,250,250,0.3);
    z-index: 110;
    max-height: 1400px;
    overflow-x: hidden;
 }
#loading img{  
    position: fixed;
    top: 50%;
    left: 50%;
}


.select-input {
    display: inline;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #c0c1c2;
    border-radius: 3px;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition-property: border-color, box-shadow;
    transition-duration: 0.15s, 0.15s;
    transition-timing-function: ease-in-out, ease-in-out;
    transition-delay: 0s, 0s;
    width: 100%;
    }

.select-input:active,.select-input:focus-visible {
    box-shadow: 0 0 0 0.1rem var(--brand-color) !important;
    outline: none !important;
    border: none !important;
}
</style>


<div id="loading" id="fullPageLoad">
    <img id= "gif" src="{{ asset('images/loading.svg') }}" alt="Loading" width="152" height="152" >
</div>



<div class="container  pt-5 mb-5">
      <div class="row c-row" style=" box-shadow: 0 0 5px 0;">
      <?php 
      if($staffmember->stripe_token!=''){
      $json = json_decode($staffmember->stripe_token);
   $publishable_key = $json->stripe_publishable_key; 
   $account_id=$json->stripe_user_id;
   }
   else{
      $publishable_key='';
      $account_id='';
   }
   ?>
   
         <div class="col-lg-4 p-3 pt-4 info_container" style="border: 1px solid rgba(146, 146, 146, 0.425);">
         @if(!isset($_GET['type']))
              @if($staffmember->logo)
                <img class="d-block m-auto" src="{{ Storage::url($staffmember->logo) }}" style="max-width: 220px; max-height: 250px;align-items: center;">   
                @else
                @if(@isset($business))
                <img class="d-block m-auto" src="{{ Storage::url($business->logo) }}" style="max-width: 220px; max-height: 250px;align-items: center;">   
                @endif
                @endif
                @if($staffmember->profile)
                <img class="d-block m-auto myimg ml-lg-3" src="{{ Storage::url($staffmember->profile) }}" style="max-width: 90px; max-height:90px;border:2px solid var(--brand-color);">
                @endif
                @endif
                <br>
                        <hr>
          
            <h4 class="text-muted">&nbsp;&nbsp;{{$staffmember->name}}</h4>
            <br>
            <h4 class="mt-3 details-header" style="opacity:.8;">  {{$service->name}}</h3>
               <p class="d-flex mt-sm-3 details-center">
                  <span class="material-icons icon-top">schedule</span>30mins &nbsp;
                  <span class="material-icons" style="margin: 3px;"></span>&nbsp;{{$service->location}}
                  @if($service->location=='custom')
                            <p style="text-align: center;">{{ $service->location_name }}
                            @endif
               </p>
               <p class="d-flex mt-sm-3 details-center ">
                  <span class="material-icons icon-top">public</span>{{$timezone}}
               </p>
               <p class="d-flex mt-sm-3 details-center">
                  <span class="material-icons icon-bottom">calendar_today</span>
                  <?php
                  if($staffmember->date_format=='MM/DD/YYYY')
                  $staffDateFormat='m/d/y';
                  else
                  $staffDateFormat='d/m/y ';
                  $dateValue= date($staffDateFormat,strtotime($date));
                  
                  ?>
                  <span id="date"> {{$slot}} on {{$dateValue}} </span>
               </p>
         </div>
         <div class="col-md-12 col-lg-8 col-sm-12">
            <h2 class="m-4 form-header" style="text-align:center; opacity: 0.7; font-size: 2rem;"> Booking Form </h2>
            <hr>
<div class="row ml-4">
<div class="form-group col-9">
<form id="booking_form" method="post" onsubmit="callgif()" action="{{route('service.meeting.saveBooking')}}">
               @csrf @if ($errors->any())
                 
                 @foreach ($errors->all() as $error)
                 <span class="text-danger">{{ $error }}</span><br>
                 @endforeach
                 @endif

               <input type="hidden" id="staffid" name="staffid" value="{{$staffmember->id}}">
               <input type="hidden" id="stripeCard" name="stripeCard">
               <input type="hidden" id="amountValue" name="amountValue">
               <input type="hidden" id="couponid" name="couponid">
               <input type="hidden" id="paymode" name="paymode" value="{{$service->paymode}}">
               <input type="hidden" id="price" name="price" value="{{$service->price}}">
               <input type="hidden" id="bookingtype" name="bookingtype" value="{{$service->id}}">
               <input type="hidden" id="stripetoken" name="stripetoken" value="{{$staffmember->stripe_token}}">
               <input type="hidden" id="paypaltoken" name="paypaltoken" value="{{$staffmember->paypal_token}}">
               <input type="hidden" id="apikey" name="apikey" value="{{$publishable_key}}">
               <input type="hidden" id="intent_id" name="intent_id">
               <input type="hidden" id="accountid" name="accountid" value="{{$account_id}}">
               <input type="hidden" id="staffid" name="staffid" value="{{$staffmember->id}}">
            <input type="hidden" id="serviceid" name="serviceid" value="{{$service->id}}">
            <input type="hidden" name="booking_id" id="booking_id" value="{{ $booking_id }}">
            
            <input type="hidden" name="date" value="{{$date}}">
            <input type="hidden" name="slot" value="{{$slot}}">
            <input type="hidden" name="timezone" value="{{$timezone}}">
            <input type="hidden" name="clienttimezone" value="{{$clienttimezone}}">
            <label for="name"><b>Name*</b> </label>
            <input type="text" class="select-input" id="name" name="name"  value="{{ old('name')}}" required /> 

               <!-- <div class="row ml-4">
                  <div class="form-group col-9">
                     
                  </div>
               </div> -->
               <label for="email"> <b>Email*</b></label>
                     <input type="email" class="select-input" id="email" name="email"  value="{{ old('email')}}" required /> 

               <!-- <div class="row ml-4">
                  <div class="form-group col-9">
                     
                  </div>
               </div> -->
               <label for="email"> <i><b>Guest Email</b></i> </label>
                    <input type="text" class="select-input mb-1" id="guestemail" name="guestemail"  value="{{ old('guestemail') }}" /> 
                    <p>(Enter 3 Emails Seperated By Commas)</p>
               <!-- div class="row ml-4">
                  <div class="form-group col-9">
                     
                    
                  </div>
               </div>
                -->
                @if($service->paymode=="Stripe/Paypal" || $service->paymode=="Stripe" || $service->paymode=="Paypal")
                
                  <div class="form-group col-7" id="couponDiv">
                     <label for="email"> <i><b>Coupon Code</b></i> </label>
                     <input type="text" class="form-control" id="coupon_code" name="coupon_code" style="border-color:rgba(20, 117, 20, 0.356); border-style:groove; border-width:2px;"><span id="tick"></span> 
         
				 
               
			   <span id="wrong_code"></span>
				 <span id="right_code"></span>
         </div>
         @endif
               @if($service->paymode=="Stripe/Paypal" && ($staffmember->stripe_token!='' || $staffmember->paypal_token))
               <div id="payboth">
               <div class="row">
               <div class="col-lg-12">
               <label>Payment Method</label>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input type="radio" name="payment_method" value="stripe"> Credit/Debit Card
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input type="radio" name="payment_method" value="paypal"> Paypal
                                            </div>
                                        </div>
               </div>
               </div>
               @endif
            
               <div id="stripe_block" style="display:none">
               
               <div id="card-element">
    <!-- Elements will create input elements here -->
    
    
  </div>

  <!-- We'll put the error messages in this element -->
  <div id="card-errors" role="alert"></div>
  <div class="alert alert-success success" style="display:none" role="alert"></div>
  <div id="billing">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label>Billing Address<i class="small">*</i></label>
                                                <div class="row">
                                                    <div class="col-md-8 col-12 mb-2">                                    
                                                        <input type="text" class="form-control br-0" name="billing_address" placeholder="Address Line">
                                                    </div>
                                                    <div class="col-md-4 col-12 mb-2">
                                                        <input type="text" class="form-control br-0" name="billing_city" placeholder="City">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4 col-12 mb-2">
                                                        <input type="text" class="form-control br-0" id="billing_state" name="billing_state" placeholder="State">
                                                    </div>
                                                    <div class="col-md-4 col-12 mb-2">
                                                        <input type="text" class="form-control br-0" id="billing_pin" name="billing_pin" placeholder="Pin">
                                                    </div>
                                                    <div class="col-md-4 col-12 mb-2">
                                                        <select class="form-control br-0" id="billing_country" name="billing_country">
                                                            <option value="AF">Afghanistan</option>
                                                            <option value="AX">Åland Islands</option>
                                                            <option value="AL">Albania</option>
                                                            <option value="DZ">Algeria</option>
                                                            <option value="AS">American Samoa</option>
                                                            <option value="AD">Andorra</option>
                                                            <option value="AO">Angola</option>
                                                            <option value="AI">Anguilla</option>
                                                            <option value="AQ">Antarctica</option>
                                                            <option value="AG">Antigua and Barbuda</option>
                                                            <option value="AR">Argentina</option>
                                                            <option value="AM">Armenia</option>
                                                            <option value="AW">Aruba</option>
                                                            <option value="AU">Australia</option>
                                                            <option value="AT">Austria</option>
                                                            <option value="AZ">Azerbaijan</option>
                                                            <option value="BS">Bahamas</option>
                                                            <option value="BH">Bahrain</option>
                                                            <option value="BD">Bangladesh</option>
                                                            <option value="BB">Barbados</option>
                                                            <option value="BY">Belarus</option>
                                                            <option value="BE">Belgium</option>
                                                            <option value="BZ">Belize</option>
                                                            <option value="BJ">Benin</option>
                                                            <option value="BM">Bermuda</option>
                                                            <option value="BT">Bhutan</option>
                                                            <option value="BO">Bolivia, Plurinational State of</option>
                                                            <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                            <option value="BA">Bosnia and Herzegovina</option>
                                                            <option value="BW">Botswana</option>
                                                            <option value="BV">Bouvet Island</option>
                                                            <option value="BR">Brazil</option>
                                                            <option value="IO">British Indian Ocean Territory</option>
                                                            <option value="BN">Brunei Darussalam</option>
                                                            <option value="BG">Bulgaria</option>
                                                            <option value="BF">Burkina Faso</option>
                                                            <option value="BI">Burundi</option>
                                                            <option value="KH">Cambodia</option>
                                                            <option value="CM">Cameroon</option>
                                                            <option value="CA">Canada</option>
                                                            <option value="CV">Cape Verde</option>
                                                            <option value="KY">Cayman Islands</option>
                                                            <option value="CF">Central African Republic</option>
                                                            <option value="TD">Chad</option>
                                                            <option value="CL">Chile</option>
                                                            <option value="CN">China</option>
                                                            <option value="CX">Christmas Island</option>
                                                            <option value="CC">Cocos (Keeling) Islands</option>
                                                            <option value="CO">Colombia</option>
                                                            <option value="KM">Comoros</option>
                                                            <option value="CG">Congo</option>
                                                            <option value="CD">Congo, the Democratic Republic of the</option>
                                                            <option value="CK">Cook Islands</option>
                                                            <option value="CR">Costa Rica</option>
                                                            <option value="CI">Côte d'Ivoire</option>
                                                            <option value="HR">Croatia</option>
                                                            <option value="CU">Cuba</option>
                                                            <option value="CW">Curaçao</option>
                                                            <option value="CY">Cyprus</option>
                                                            <option value="CZ">Czech Republic</option>
                                                            <option value="DK">Denmark</option>
                                                            <option value="DJ">Djibouti</option>
                                                            <option value="DM">Dominica</option>
                                                            <option value="DO">Dominican Republic</option>
                                                            <option value="EC">Ecuador</option>
                                                            <option value="EG">Egypt</option>
                                                            <option value="SV">El Salvador</option>
                                                            <option value="GQ">Equatorial Guinea</option>
                                                            <option value="ER">Eritrea</option>
                                                            <option value="EE">Estonia</option>
                                                            <option value="ET">Ethiopia</option>
                                                            <option value="FK">Falkland Islands (Malvinas)</option>
                                                            <option value="FO">Faroe Islands</option>
                                                            <option value="FJ">Fiji</option>
                                                            <option value="FI">Finland</option>
                                                            <option value="FR">France</option>
                                                            <option value="GF">French Guiana</option>
                                                            <option value="PF">French Polynesia</option>
                                                            <option value="TF">French Southern Territories</option>
                                                            <option value="GA">Gabon</option>
                                                            <option value="GM">Gambia</option>
                                                            <option value="GE">Georgia</option>
                                                            <option value="DE">Germany</option>
                                                            <option value="GH">Ghana</option>
                                                            <option value="GI">Gibraltar</option>
                                                            <option value="GR">Greece</option>
                                                            <option value="GL">Greenland</option>
                                                            <option value="GD">Grenada</option>
                                                            <option value="GP">Guadeloupe</option>
                                                            <option value="GU">Guam</option>
                                                            <option value="GT">Guatemala</option>
                                                            <option value="GG">Guernsey</option>
                                                            <option value="GN">Guinea</option>
                                                            <option value="GW">Guinea-Bissau</option>
                                                            <option value="GY">Guyana</option>
                                                            <option value="HT">Haiti</option>
                                                            <option value="HM">Heard Island and McDonald Islands</option>
                                                            <option value="VA">Holy See (Vatican City State)</option>
                                                            <option value="HN">Honduras</option>
                                                            <option value="HK">Hong Kong</option>
                                                            <option value="HU">Hungary</option>
                                                            <option value="IS">Iceland</option>
                                                            <option value="IN">India</option>
                                                            <option value="ID">Indonesia</option>
                                                            <option value="IR">Iran, Islamic Republic of</option>
                                                            <option value="IQ">Iraq</option>
                                                            <option value="IE">Ireland</option>
                                                            <option value="IM">Isle of Man</option>
                                                            <option value="IL">Israel</option>
                                                            <option value="IT">Italy</option>
                                                            <option value="JM">Jamaica</option>
                                                            <option value="JP">Japan</option>
                                                            <option value="JE">Jersey</option>
                                                            <option value="JO">Jordan</option>
                                                            <option value="KZ">Kazakhstan</option>
                                                            <option value="KE">Kenya</option>
                                                            <option value="KI">Kiribati</option>
                                                            <option value="KP">Korea, Democratic People's Republic of</option>
                                                            <option value="KR">Korea, Republic of</option>
                                                            <option value="KW">Kuwait</option>
                                                            <option value="KG">Kyrgyzstan</option>
                                                            <option value="LA">Lao People's Democratic Republic</option>
                                                            <option value="LV">Latvia</option>
                                                            <option value="LB">Lebanon</option>
                                                            <option value="LS">Lesotho</option>
                                                            <option value="LR">Liberia</option>
                                                            <option value="LY">Libya</option>
                                                            <option value="LI">Liechtenstein</option>
                                                            <option value="LT">Lithuania</option>
                                                            <option value="LU">Luxembourg</option>
                                                            <option value="MO">Macao</option>
                                                            <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                                            <option value="MG">Madagascar</option>
                                                            <option value="MW">Malawi</option>
                                                            <option value="MY">Malaysia</option>
                                                            <option value="MV">Maldives</option>
                                                            <option value="ML">Mali</option>
                                                            <option value="MT">Malta</option>
                                                            <option value="MH">Marshall Islands</option>
                                                            <option value="MQ">Martinique</option>
                                                            <option value="MR">Mauritania</option>
                                                            <option value="MU">Mauritius</option>
                                                            <option value="YT">Mayotte</option>
                                                            <option value="MX">Mexico</option>
                                                            <option value="FM">Micronesia, Federated States of</option>
                                                            <option value="MD">Moldova, Republic of</option>
                                                            <option value="MC">Monaco</option>
                                                            <option value="MN">Mongolia</option>
                                                            <option value="ME">Montenegro</option>
                                                            <option value="MS">Montserrat</option>
                                                            <option value="MA">Morocco</option>
                                                            <option value="MZ">Mozambique</option>
                                                            <option value="MM">Myanmar</option>
                                                            <option value="NA">Namibia</option>
                                                            <option value="NR">Nauru</option>
                                                            <option value="NP">Nepal</option>
                                                            <option value="NL">Netherlands</option>
                                                            <option value="NC">New Caledonia</option>
                                                            <option value="NZ">New Zealand</option>
                                                            <option value="NI">Nicaragua</option>
                                                            <option value="NE">Niger</option>
                                                            <option value="NG">Nigeria</option>
                                                            <option value="NU">Niue</option>
                                                            <option value="NF">Norfolk Island</option>
                                                            <option value="MP">Northern Mariana Islands</option>
                                                            <option value="NO">Norway</option>
                                                            <option value="OM">Oman</option>
                                                            <option value="PK">Pakistan</option>
                                                            <option value="PW">Palau</option>
                                                            <option value="PS">Palestinian Territory, Occupied</option>
                                                            <option value="PA">Panama</option>
                                                            <option value="PG">Papua New Guinea</option>
                                                            <option value="PY">Paraguay</option>
                                                            <option value="PE">Peru</option>
                                                            <option value="PH">Philippines</option>
                                                            <option value="PN">Pitcairn</option>
                                                            <option value="PL">Poland</option>
                                                            <option value="PT">Portugal</option>
                                                            <option value="PR">Puerto Rico</option>
                                                            <option value="QA">Qatar</option>
                                                            <option value="RE">Réunion</option>
                                                            <option value="RO">Romania</option>
                                                            <option value="RU">Russian Federation</option>
                                                            <option value="RW">Rwanda</option>
                                                            <option value="BL">Saint Barthélemy</option>
                                                            <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                                            <option value="KN">Saint Kitts and Nevis</option>
                                                            <option value="LC">Saint Lucia</option>
                                                            <option value="MF">Saint Martin (French part)</option>
                                                            <option value="PM">Saint Pierre and Miquelon</option>
                                                            <option value="VC">Saint Vincent and the Grenadines</option>
                                                            <option value="WS">Samoa</option>
                                                            <option value="SM">San Marino</option>
                                                            <option value="ST">Sao Tome and Principe</option>
                                                            <option value="SA">Saudi Arabia</option>
                                                            <option value="SN">Senegal</option>
                                                            <option value="RS">Serbia</option>
                                                            <option value="SC">Seychelles</option>
                                                            <option value="SL">Sierra Leone</option>
                                                            <option value="SG">Singapore</option>
                                                            <option value="SX">Sint Maarten (Dutch part)</option>
                                                            <option value="SK">Slovakia</option>
                                                            <option value="SI">Slovenia</option>
                                                            <option value="SB">Solomon Islands</option>
                                                            <option value="SO">Somalia</option>
                                                            <option value="ZA">South Africa</option>
                                                            <option value="GS">South Georgia and the South Sandwich Islands</option>
                                                            <option value="SS">South Sudan</option>
                                                            <option value="ES">Spain</option>
                                                            <option value="LK">Sri Lanka</option>
                                                            <option value="SD">Sudan</option>
                                                            <option value="SR">Suriname</option>
                                                            <option value="SJ">Svalbard and Jan Mayen</option>
                                                            <option value="SZ">Swaziland</option>
                                                            <option value="SE">Sweden</option>
                                                            <option value="CH">Switzerland</option>
                                                            <option value="SY">Syrian Arab Republic</option>
                                                            <option value="TW">Taiwan, Province of China</option>
                                                            <option value="TJ">Tajikistan</option>
                                                            <option value="TZ">Tanzania, United Republic of</option>
                                                            <option value="TH">Thailand</option>
                                                            <option value="TL">Timor-Leste</option>
                                                            <option value="TG">Togo</option>
                                                            <option value="TK">Tokelau</option>
                                                            <option value="TO">Tonga</option>
                                                            <option value="TT">Trinidad and Tobago</option>
                                                            <option value="TN">Tunisia</option>
                                                            <option value="TR">Turkey</option>
                                                            <option value="TM">Turkmenistan</option>
                                                            <option value="TC">Turks and Caicos Islands</option>
                                                            <option value="TV">Tuvalu</option>
                                                            <option value="UG">Uganda</option>
                                                            <option value="UA">Ukraine</option>
                                                            <option value="AE">United Arab Emirates</option>
                                                            <option value="GB">United Kingdom</option>
                                                            <option value="US">United States</option>
                                                            <option value="UM">United States Minor Outlying Islands</option>
                                                            <option value="UY">Uruguay</option>
                                                            <option value="UZ">Uzbekistan</option>
                                                            <option value="VU">Vanuatu</option>
                                                            <option value="VE">Venezuela, Bolivarian Republic of</option>
                                                            <option value="VN">Viet Nam</option>
                                                            <option value="VG">Virgin Islands, British</option>
                                                            <option value="VI">Virgin Islands, U.S.</option>
                                                            <option value="WF">Wallis and Futuna</option>
                                                            <option value="EH">Western Sahara</option>
                                                            <option value="YE">Yemen</option>
                                                            <option value="ZM">Zambia</option>
                                                            <option value="ZW">Zimbabwe</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
  </div>
               <button type="button" id="pay" class="pay btn btn-primary">Pay</button>
               
               
               </div>
               
               <div id="paypal_block" style="display:none">
                                <input type="hidden" name="paypal_txn_id" id="paypal_txn_id">
                                <input type="hidden" name="paypal_pay_status" id="paypal_pay_status">
                                <input type="hidden" name="paypal_error_msg" id="paypal_error_msg">
                                <div id="paypal-button-container"></div>
                                    <div class="alert alert-success hide" style="display:none" id="paypal_success"></div>
                                    <div class="alert alert-danger hide" style="display:none" id="paypal_error"></div>
                            
               </div>  
               
         <!--       <img src="{{ asset('images/loading.svg') }}" id="gif" style="display:none"> -->
               <?php
               $i=0;
               $setValue="false";
               
               ?>
               @foreach($bookingForm as $field)
               <?php 
                 $required='';
                 if($field->isrequired==1){
                     $required='required';
                 }
                 
                ?>
              
                           
                           <input type="hidden" name="labels[]" value="{{ $field->field_name }}">
                           <input type="hidden" name="type[]" value="{{ $field->field_type }}">
                           
                            @if($required=='required')
                           <label for="{{ $field->field_name }}"><i><b>{{ $field->field_name }}*</b></i></label>
                           @else
                           <label for="{{ $field->field_name }}"><i><b>{{ $field->field_name }}</b></i></label>
                           @endif

                            @if($field->field_type == 'textarea')
                                <textarea class='select-input' rows="5" {{$required}} name="fields{{$i}}[]" width="100%" rows=3></textarea> 
                            @elseif($field->field_type == 'select')
                        <select class='select-input' name="fields{{$i}}[]" {{ $required }}>
                            @foreach(explode(",",$field->options) as $option)
                            <option  value="{{$option}}">{{$option}}</option>
                            @endforeach
                            </select>
                            @elseif($field->field_type == 'radio' )
                            @foreach(explode(",",$field->options) as $option)
                            <br>
                            
                            <input {{ $required }} name="fields{{$i}}[]" type="{{$field->field_type}}"  value="{{$option}}"></input>{{$option}}
                            @endforeach
                            @elseif($field->field_type == 'checkbox')
                            @if($required)
                            <div class="checked">
                                @else
                                <div>
                                @endif
                                @foreach(explode(",",$field->options) as $option)
                                <br>
                               
                                <input type="checkbox" value="{{$option}}" name="list{{$i}}[]">{{$option}}
                                
                                @endforeach
                                </div>
                                @else
                                <input {{$required}} name="fields{{$i}}[]" type="{{$field->field_type}}" class="select-input" >
                                @endif
                          
                            </div>
                  
                    <?php
               ++$i;
               ?>
                    @endforeach
                    @if($booking_id!='null')
                    <div class="row ml-4">
                  <div class="form-group col-5">
                     <label for="name"> Reschedule Notes </label>
                     <input type="text" class="form-control" id="reschedulenote" name="reschedulenote" required /> 
                  </div>
               </div>
                    @endif
                    <input type="submit"   style="background-color: var(--brand-color); outline:  var(--brand-color); border: none; font-weight: 500;" class="btn float-right btn-primary" value="Book now">
                     <!--  <div class="row ml-4">
                  <div class="form-group col-5">
                    
                  </div>
                </div> -->
                
            </form>
</div></div>
         </div>
      </div>
   </div>
   <?php
   if($staffmember->paypal_token!=''){?>
   <script src="https://www.paypal.com/sdk/js?client-id=Af7N95FUfA-aCPhrNyMToW0E3jTerYUQgniqwG2gDO9npBa0EjjJZTtcnzmst2gJ6uU-fKVeJa5ZBfIQ&disable-funding=credit,card&merchant-id=<?= $staffmember->paypal_token ?>&currency=<?= strtoupper($service->currency) ?>"></script>
   
   <?php }?>
   <script type="text/javascript" src="https://js.stripe.com/v3/"></script>
   <script src="{{ asset('vendor/js/stripe-book.js') }}"></script>
         
   
   
  
   <script>
        
       function callgif(){
        $('#loading').show(); 
        $('#gif').show(); 
       }
        
       $.ajaxSetup({
  beforeSend: function(xhr, type) {
      if (!type.crossDomain) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
      }
  },
});
 
    
function validateForm(){
	var lEmail = $('#email').val();
	var lName = $('#name').val();
	
	if( lName != '' &&  lEmail != ''){
		
	  return true;
	  
	}else {
	   
      return false;
    } 
}	 
if($("#paypaltoken").val()!=''){
  
  
paypal.Buttons({
            createOrder: function(data, actions) {
              
              if($("#couponid").val()!='')
              var amountToPay=$('#amountValue').val();
              else
              var amountToPay=$('#price').val();
              return actions.order.create({
                purchase_units: [{
                  description : "<?= $service->name ?>",
                  amount: {
                    value: amountToPay,
                    currency_code: "<?= strtoupper($service->currency) ?>",
                  },
                  payee: {
                    email_address: "<?= $staffmember->paypal_token ?>"
                  },
                }],
                application_context: {
                  brand_name : "<?= $service->name ?>",
                  shipping_preference: "NO_SHIPPING",
                  user_action: "PAY_NOW",
                }
              });
            },
            onApprove: function(data, actions) {
              return actions.order.capture().then(function(details) {
                var pay_id = details.purchase_units[0].payments.captures[0].id;
                var pay_email = details.payer.email_address;
                var final_status = details.status;
                var pay_status = details.purchase_units[0].payments.captures[0].status;
                var pay_detail = "";
                if ("status_details" in details.purchase_units[0].payments.captures[0]){
                  pay_detail = details.purchase_units[0].payments.captures[0].status_details.reason;
                }
                if (final_status == "COMPLETED") {
                  $("#paypal_txn_id").val(pay_id);
                  $("#paypal_pay_status").val("Success");
                  if (pay_detail != "") {
                      $("#paypal_error_msg").val(pay_status+": "+pay_detail);
                  }
                  $("#paypal_success").html("Payment Succesful with Transaction ID: "+pay_id+".<br> Complete booking by clicking the button below.");
                  $("#paypal_success").show();
                  $("#paypal_error").hide();
                  $('#payboth').hide();
                  $('#couponDiv').hide();
                   $("#stripe_block").hide();
                  $("#paypal-button-container").hide();
                  $("input[name=payment_method]").attr('disabled',true);
                  $("#booknow").attr('disabled', false);
                  
                }else{
                  $("#stripe_block").hide();
                  $("#paypal_success").hide();
                  $("#paypal_error").html("Transaction incomplete, reference ID: "+pay_id+".");
                  $("#paypal_error").show();
                  $('#fullPageLoad').hide();
                }
              });
            },
            onCancel: function(e){
               $("#stripe_block").hide();              
            }
          }).render('#paypal-button-container');
        }

        $("#coupon_code").on('change keyup paste', function(){
	let code=$('#coupon_code').val();
  let price=$('#price').val();
	let staffid=$('#staffid').val();
  let bookingtype=$('#bookingtype').val();
	if(code===''){
	$('#pay').prop('disabled', true);
	$('#tick').html('');
	return false;
	}
	else{
		
    $.ajax({
    type: 'GET',
    dataType: 'json',
    url: "/coupon/checkCouponExistence",
    data: {code:code,ajax:'true',bookingtype:bookingtype,staffid:staffid,price:price},
  success: function (data) {
    $('#amountValue').val(data.amount);
    
		if(data.available=='true'){
			
			$('#tick').html('&#10004;');
      $("#right_code").html('Promo Code applied, Amount to be paid after discount : '+data.amount);
      $("#wrong_code").html('');
      $('#couponid').val(data.couponid);
    	
		}
		else{
			$('#tick').html('&#10060;');
      $("#wrong_code").html('Please enter a valid Coupon Code');
    $("#right_code").html('');
    
    
			
		}
    },
    error: function (jqXhr, json, errorThrown) {
      alert(json);
      var errors = jqXhr.responseJSON;
      var errorsHtml = '';
      $.each(errors['errors'], function (index, value) {
        errorsHtml += '<ul class="list-group"><li class="list-group-item alert alert-danger">' + value + '</li></ul>';
      });

      alert(errorsHtml);
      return false;
    }

  });
}
});
 
        </script>


@endsection
