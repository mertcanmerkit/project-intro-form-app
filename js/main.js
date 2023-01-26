var wizard_step = 0;
var last_step = 5; // How many wizard pages do you have?

function proggres(wizard_step) {
    let proggres_bar_width_max = 100 / (last_step + 1);

    for (let i = 0; i <= last_step; i++) {
        let proggres_bars_width = proggres_bar_width_max * (wizard_step + 1);
        (proggres_bars_width === 100) ? $(".progress-bar").css('border-radius', 'unset') : $(".progress-bar").css({
            'border-top-right-radius': '1rem',
            'border-bottom-right-radius': '1rem'
        });
        switch (wizard_step) {
            case i:
                $(".progress-bar").css("width", proggres_bars_width + "%");
                break
        }
    }
}

function hasPreviewImgInput() {
    img_path = URL.createObjectURL(event.target.files[0]);
    $("#inputImgPreview").css('background-image', 'url(' + URL.createObjectURL(event.target.files[0]) + ')').toggleClass('animate__animated animate__flipInY animate__fast');
    $("#labelFileImg").attr('for', 'imgAdded');
    $("#inputImgPreview").find('#uploadIconInoutImg').attr('class', 'far fa-times-circle satin-circle');
    $("#inputImgPreview").find('#uploadIconInoutImg').attr('id', 'removeIconInputImg');
}

function goToStep(step) {
    isSetValidateBtnCreateNextBtn();

    $("#wizard-step-" + wizard_step).hide();
    wizard_step = step;
    $("#wizard-step-" + wizard_step).show();
    proggres(wizard_step);
}

function isLastStep() {
    return wizard_step + 1 === last_step;
}

function createValidateBtn() {
    $("#next").html("Validate");
    $("#next").attr('id', "validate");
}

function isSetValidateBtnCreateNextBtn() {
    if ($("#validate").length) {
        $("#validate").html("Next");
        $("#validate").attr('id', "next");
    }
}

function formatDate(dateTime) {
    // Example dateTime = '2017-04-17'
    let parts = dateTime.split(/[-]/);
    return parts[2] + '/' + parts[1] + '/' + parts[0];
}

/* Dynamic variable operations */

let selected_members = [];
let selected_tools = [];
let img_path = '';
let project_name,
    project_desc,
    project_related_industries,
    start_date,
    finish_date,
    project_budget;

$("#next").click(function () {
    if (isLastStep()) {
        /* Get Project Info Variables */

        project_name = $("input[name=project_name]").val();
        project_desc = $("textarea[name=project_desc]").val();
        project_related_industries = $("select[name=project_related_industries]").val();
        start_date = $("input[name=start_date]").val();
        finish_date = $("input[name=finish_date]").val();
        project_budget = $(".budgets").find('.is-select').html();

        var formated_finish_date = formatDate(finish_date);

        if (img_path.length) {
            $(".p-avatar").css('background-image', 'url(' + img_path + ')');
            $("#first-letter").hide();
        } else {
            (project_name) ? $("#first-letter").html(project_name.charAt(0)) : $("#first-letter").html('P');
            $("#first-letter").show();
        }

        (project_name) ? $("#project_name_review").html(project_name) : $("#project_name_review").html('Project Title Goes Here');
        (project_desc) ? $("#project_desc_review").html(project_desc) : $("#project_desc_review").html('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis negat? Tamen a proposito, inquam, aberramus. Deinde dolorem quem maximum?');
        (project_related_industries) ? $("#project_related_industries_review").html(project_related_industries) : $("#project_related_industries_review").html('Project Type Goes Here');
        (finish_date) ? $("#project_finish_date_review").html(formated_finish_date) : $("#project_finish_date_review").html('dd/mm/yyyy');
        (project_budget) ? $("#project_budget_review").html(project_budget) : $("#project_budget_review").html('< 5K');

        /* END Get Project Info Variables */

        /* Get Tool Variables */
        $(".tool-review-field").html("");
        if (selected_tools.length) {
            $.each(selected_tools, function (key, value) {
                $(".tool-review-field").append(
                    '            <div class="tool-review">\n' +
                    '                 <div class="tool-card">\n' +
                    '                     <div class="tool-card-inner d-flex align-items-center">\n' +
                    '                         <div class="tool-avatar">\n' +
                    '                             <img src="' + value.image + '" class="tool-img" alt="">\n' +
                    '                         </div>\n' +
                    '                         <div class="tool-content">\n' +
                    '                             <span class="dark-card-header d-block">' + value.name + '</span>\n' +
                    '                             <span class="dark-card-title" id="member_name">' + value.title + '</span>\n' +
                    '                         </div>\n' +
                    '                     </div>\n' +
                    '                 </div>\n' +
                    '             </div>'
                );
            });
        } else {
            $(".tool-review-field").append("" +
                "<div class=\"team-empty\">\n" +
                "  <span class=\"is-text-empty\">No selected tools</span>\n" +
                "</div>")
        }
        /* END Get Tool Variables */

        /* Get Team Variables */
        $(".team-review-field").html("");
        if (selected_members.length) {
            $.each(selected_members, function (key, value) {
                $(".team-review-field").append(
                    '            <div class="team-members-review">\n' +
                    '                 <div class="member-card">\n' +
                    '                     <div class="member-card-inner d-flex align-items-center">\n' +
                    '                         <div class="member-avatar">\n' +
                    '                             <img src="' + value.image + '" class="member-img" id="member_img" alt="">\n' +
                    '                         </div>\n' +
                    '                         <div class="member-content">\n' +
                    '                             <span class="dark-card-header d-block">Invite</span>\n' +
                    '                             <span class="dark-card-title" id="member_name">' + value.name + '</span>\n' +
                    '                         </div>\n' +
                    '                     </div>\n' +
                    '                 </div>\n' +
                    '             </div>'
                );
            });
        } else {
            $(".team-review-field").append("" +
                "<div class=\"team-empty\">\n" +
                "  <span class=\"is-text-empty\">No selected teammate</span>\n" +
                "</div>")
        }
        /* END Get Team Variables */

        /* Get Customer Variables */
        $(".customer-review-field").html("");
        if (selected_customer.length) {
            $.each(selected_customer, function (key, value) {
                $(".customer-review-field").append(
                    '            <div class="tool-review">\n' +
                    '                 <div class="tool-card">\n' +
                    '                     <div class="tool-card-inner" style="padding: 0!important;">\n' +
                    '                         <div class="tool-avatar">\n' +
                    '                             <img src="' + value.image + '" class="tool-img" alt="">\n' +
                    '                         </div>\n' +
                    '                         <div class="tool-content">\n' +
                    '                             <span class="dark-card-header d-block">' + value.name + '</span>\n' +
                    '                             <span class="dark-card-title" id="member_name">' + value.location + '</span>\n' +
                    '                         </div>\n' +
                    '                     </div>\n' +
                    '                 </div>\n' +
                    '             </div>'
                );
            });
        } else {
            $(".customer-review-field").append(
                '                   <div class="tool-content-empty">\n' +
                '                       <span class="is-text-empty">No selected customer</span>\n' +
                '                   </div>'
            );
        }
        /* END Get Customer Variables */
    }
});

/* END Dynamic variable operations */

/* Get Member - Search */

$(document).on("click", ".mCard", function () {

    $(this).toggleClass("is-select-border");
    $(this).find(".add-icon").toggleClass("selected-icon");

    selected_members = [];
    $("input[name='members[]']:checked").each(function (i) {
        var id = parseInt($(this).val());
        var card = $("#card-" + id);

        card.find("input").prop("checked", false);
        card.hide();

        const index = selected_members.findIndex(object => object.member_id === id);
        if (index === -1) {
            selected_members.push({
                "member_id": id,
                "name": card.find("#member_name").html(),
                "image": card.find("#member_img").attr('src'),
            });
        }
    });

    $(".selected-members").html("");
    $.each(selected_members, function (key, value) {
        $(".selected-members").append(
            '      <div class="member-card mt-3 is-select-border mCard s-mCard" id="card-' + value.member_id + '">\n' +
            '           <input type="checkbox" checked name="members[]" value="' + value.member_id + '">\n' +
            '           <div class="member-card-inner d-flex align-items-center justify-content-around">\n' +
            '               <div class="member-avatar">\n' +
            '                   <img src="' + value.image + '" class="member-img" id="member_img" alt="">\n' +
            '               </div>\n' +
            '               <div class="member-content">\n' +
            '                   <span class="dark-card-header d-block">Invite</span>\n' +
            '                   <span class="dark-card-title" id="member_name">' + value.name + '</span>\n' +
            '               </div>\n' +
            '               <div class="member-selected">\n' +
            '                   <i class="fas fa-times-circle" style="color: #ff0015;"></i>\n' +
            '               </div>\n' +
            '           </div>\n' +
            '      </div>'
        );
    })

});

$(document).on("keyup", "#member-search", function () {
    $(".members-field-inner").html("");
    var search = $("#member-search").val();
    var exp = new RegExp(search, "i");
    if (search.length > 1) {
        $.getJSON("./assets/json/members.json", function (data) {
            $.each(data, function (key, value) {
                if (value.name.search(exp) !== -1) {
                    $('.members-field-inner').append(
                        ' <div class="member-card mt-3 mCard" id="card-' + value.member_id + '">\n' +
                        '      <input type="checkbox" name="members[]" value="' + value.member_id + '">\n' +
                        '      <div class="member-card-inner d-flex align-items-center justify-content-around">\n' +
                        '          <div class="member-avatar">\n' +
                        '              <img src="/assets/images/'+ value.image +'" class="member-img" id="member_img" alt="">\n' +
                        '          </div>\n' +
                        '          <div class="member-content">\n' +
                        '              <span class="dark-card-header d-block">Invite</span>\n' +
                        '              <span class="dark-card-title" id="member_name">' + value.name + '</span>\n' +
                        '          </div>\n' +
                        '          <div class="member-selected">\n' +
                        '              <i class="fas fa-plus-circle add-icon"></i>\n' +
                        '          </div>\n' +
                        '      </div>\n' +
                        '  </div>'
                    );
                }
            });
            $.each(selected_members, function (key, value) {
                var id = value.member_id;
                $(".members-field-inner").find("#card-" + id).hide();
            });
        });
    }
});

$(document).on("click", ".s-mCard", function () {
    $(".members-field-inner").html("");
    var search = $("#member-search").val();
    var exp = new RegExp(search, "i");
    if (search.length > 1) {
        $.getJSON("./assets/json/members.json", function (data) {
            $.each(data, function (key, value) {
                if (value.name.search(exp) != -1) {
                    $('.members-field-inner').append(
                        ' <div class="member-card mt-3 mCard" id="card-' + value.member_id + '">\n' +
                        '      <input type="checkbox" name="members[]" value="' + value.member_id + '">\n' +
                        '      <div class="member-card-inner d-flex align-items-center justify-content-around">\n' +
                        '          <div class="member-avatar">\n' +
                        '              <img src="/assets/images/' + value.image + '" class="member-img" id="member_img" alt="">\n' +
                        '          </div>\n' +
                        '          <div class="member-content">\n' +
                        '              <span class="dark-card-header d-block">Invite</span>\n' +
                        '              <span class="dark-card-title" id="member_name">' + value.name + '</span>\n' +
                        '          </div>\n' +
                        '          <div class="member-selected">\n' +
                        '              <i class="fas fa-plus-circle add-icon"></i>\n' +
                        '          </div>\n' +
                        '      </div>\n' +
                        '  </div>'
                    );
                }
            });
            $.each(selected_members, function (key, value) {
                var id = value.member_id;
                $(".members-field-inner").find("#card-" + id).hide();
            });
        });
    }
});

/* END Get Member - Search */

/* Get Customers - Search */

var selected_customer = [];

$(document).on('click', '.customer-card', function () {

    var id = parseInt($(this).find("input").val());
    selected_customer = [];
    selected_customer.push({
        "tool_id": id,
        "name": $(this).find("#customer_name").html(),
        "location": $(this).find('#customer_location').html(),
        "image": $(this).find("#customer_img").attr('src'),
    });

    /* is Customer Selected */

    $(".search-field").hide();
    $(".customers-field").html("");

    $(".customers-field").append(
        '                                    <div class="customer-card" id="selected-customer-card">\n' +
        '                                        <input type="checkbox" name="customer[]" value="' + selected_customer[0].tool_id + '">\n' +
        '                                        <div class="tool-card-inner d-flex align-items-center justify-content-around">\n' +
        '                                            <div class="tool-avatar">\n' +
        '                                                <img src="' + selected_customer[0].image + '" class="tool-img" id="customer_img"\n' +
        '                                                     alt="' + selected_customer[0].name + '">\n' +
        '                                            </div>\n' +
        '                                            <div class="tool-content">\n' +
        '                                                <span class="dark-card-header d-block"\n' +
        '                                                      id="customer_name">' + selected_customer[0].name + '</span>\n' +
        '                                                <span class="dark-card-title" id="customer_location">' + selected_customer[0].location + '</span>\n' +
        '                                            </div>\n' +
        '                                            <div class="tool-selected">\n' +
        '                                                <i class="fas fa-times-circle" style="color: #ff0015;" aria-hidden="true"></i>\n' +
        '                                            </div>\n' +
        '                                        </div>\n' +
        '                                    </div>'
    );
});

$(document).on('click', '#selected-customer-card', function () {
    selected_customer = [];
    $(".customers-field").html("");
    $(".search-field").show();
})

$(document).on("keyup", "#customer_search", function () {
    $(".customers-field").html("");

    var search = $("#customer_search").val();
    var exp = new RegExp(search, "i");
    if (search.length > 1) {
        $.getJSON("./assets/json/customers.json", function (data) {
            $.each(data, function (key, value) {
                if (value.name.search(exp) !== -1) {
                    $(".customers-field").append(
                        '                                    <div class="customer-card customer-card-key-'+key+'" id="cCard-' + value.id + '">\n' +
                        '                                        <input type="checkbox" name="customer[]" value="' + value.id + '">\n' +
                        '                                        <div class="tool-card-inner d-flex align-items-center justify-content-around">\n' +
                        '                                            <div class="tool-avatar">\n' +
                        '                                                <img src="/assets/images/' + value.image + '" class="tool-img" id="customer_img"\n' +
                        '                                                     alt="' + value.name + '">\n' +
                        '                                            </div>\n' +
                        '                                            <div class="tool-content">\n' +
                        '                                                <span class="dark-card-header d-block"\n' +
                        '                                                      id="customer_name">' + value.name + '</span>\n' +
                        '                                                <span class="dark-card-title" id="customer_location">' + value.location + '</span>\n' +
                        '                                            </div>\n' +
                        '                                            <div class="tool-selected">\n' +
                        '                                                <i class="fas fa-check-circle" style="font-size: 22px"></i>\n' +
                        '                                            </div>\n' +
                        '                                        </div>\n' +
                        '                                    </div>'
                    );
                }
            });
        });
    }
});

/* END Get Customers - Search */

/* Get and Select Tools */

$(document).on('click', '.tool-card', function () {
    $(this).toggleClass("is-select-border");
    $(this).find(".selected-icon").toggleClass("d-block");

    selected_tools = [];
    $("input[name='tools[]']:checked").each(function (i) {
        var id = parseInt($(this).val());
        var tool = $("#tool-" + id);

        const index = selected_tools.findIndex(object => object.tool_id === id);
        if (index === -1) {
            selected_tools.push({
                "tool_id": id,
                "name": tool.find("#tool_name").html(),
                "title": tool.find('#tool_title').html(),
                "image": tool.find("#tool_img").attr('src'),
            });
        }
    });
});

$(document).ready(() => {
    $.getJSON('./assets/json/tools.json', function (data) {
        $.each(data, function (key, value) {
            $("#tools-wrapper").append(
                '                       <div class="col-md-4 col-sm-6 mb-3">\n' +
                '                            <div class="tool-card" id="tool-' + value.tool_id + '">\n' +
                '                                <input type="checkbox" name="tools[]" value="' + value.tool_id + '">\n' +
                '                                <div class="tool-card-inner d-flex align-items-center justify-content-around">\n' +
                '                                    <div class="tool-avatar">\n' +
                '                                        <img src="/assets/images/'+value.image+'" class="tool-img" id="tool_img" alt="' + value.name + '">\n' +
                '                                    </div>\n' +
                '                                    <div class="tool-content">\n' +
                '                                        <span class="dark-card-header d-block" id="tool_name">' + value.name + '</span>\n' +
                '                                        <span class="dark-card-title" id="tool_title">' + value.title + '</span>\n' +
                '                                    </div>\n' +
                '                                    <div class="tool-selected">\n' +
                '                                        <i class="fas fa-check-circle selected-icon hidden"></i>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>'
            );
        });
    });
});

/* END Get and Select Tools */

$("document").ready(() => {
    proggres(wizard_step);
});

$("#inputImgPreview").click(function () {
    $(this).removeClass('animate__animated animate__flipInY');
    $(this).find('#removeIconInputImg').attr('id', 'uploadIconInoutImg');
    $(this).find('#uploadIconInoutImg').attr('class', 'fas fa-cloud-upload-alt');
    $(this).hide().css('background-image', '').fadeIn(200);
    $("#labelFileImg").attr('for', 'customImgPreview');
})

function continueBtn(select_id, val) {
    // Example $('#related_industries').val('Web Development').trigger('change');
    $(select_id).val(val).trigger('change');
    wizard_step += 1;
    $("#wizard-step-" + wizard_step).show();
    $("#wizard-step-" + 0).hide();
    $(".pagination").addClass("slideDownTransform");

    proggres(wizard_step);
}

$("#next").click(() => {
    if (isLastStep()) {
        createValidateBtn();
    }
    $("#wizard-step-" + wizard_step).hide();
    wizard_step += 1;
    (wizard_step > last_step) ? wizard_step = last_step : wizard_step;
    $("#wizard-step-" + wizard_step).show();

    proggres(wizard_step);
});

$("#previous").click(() => {
    isSetValidateBtnCreateNextBtn();

    $("#wizard-step-" + wizard_step).hide();
    wizard_step -= 1;
    if (wizard_step <= 0) {
        wizard_step = 0;
        $(".pagination").removeClass("slideDownTransform");

    }
    $("#wizard-step-" + wizard_step).show();

    proggres(wizard_step);
});

$("#add-files").click(function (event) {
    event.preventDefault();
    $("#step-attachment-with-add").hide();
    $(".attachment-uploader").show();
})

$("#add-members").click(function (event) {
    event.preventDefault();
    $("#step-member-with-add").hide();
    $(".add-members").show();
})

$(".budget-item").click(function (event) {
    event.preventDefault();
    $(".budget-item").removeClass("is-select");
    $(this).toggleClass("is-select");
});

// $(".member-card").click(function () {
//     $(this).toggleClass("is-select-border");
//     $(this).find(".add-icon").toggleClass("selected-icon");
// });

$("#desc-input").keyup(function () {
    var desc_input_length = $(this).val().length;
    var desc_input_remainder = 50 - desc_input_length;

    if (desc_input_length < 50) {
        $("#desc-valid").html("Minimum of " + desc_input_remainder + " characters");
    } else {
        $("#desc-valid").html("");
    }
});



