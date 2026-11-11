window.addEventListener("load", function (event) {
    class Phone {
        initializeIntlTelInput() {
            const phoneInputs = document.querySelectorAll(".phone");
            // const parent = document.querySelectorAll('.iti__country-container');
            phoneInputs.forEach((input) => {
                const iti = window.intlTelInput(input, {
                    // dropdownContainer: parent,
                    strictMode: true,
                    initialCountry: "us",
                    onlyCountries: [
                        "al",
                        "ad",
                        "at",
                        "au",
                        "ae",
                        "sa",
                        "at",
                        "br",
                        "ca",
                        "us",
                        "cn",
                        "dk",
                        "cz",
                        "fi",
                        "de",
                        "ge",
                        "is",
                        "jm",
                        "no",
                        "nl",
                        "mx",
                        "pl",
                        "qa",
                        "ro",
                        "ru",
                        "es",
                        "ch",
                        "se",
                        "tr",
                        "kw",
                    ],
                    geoIpLookup: function (callback) {
                        fetch("https://ipinfo.io", {
                            method: "GET",
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                var countryCode =
                                    data && data.country ? data.country : "";
                                if (
                                    ![
                                        "al",
                                        "ad",
                                        "at",
                                        "au",
                                        "ae",
                                        "sa",
                                        "at",
                                        "br",
                                        "ca",
                                        "us",
                                        "cn",
                                        "dk",
                                        "cz",
                                        "fi",
                                        "de",
                                        "ge",
                                        "is",
                                        "jm",
                                        "no",
                                        "nl",
                                        "mx",
                                        "pl",
                                        "qa",
                                        "ro",
                                        "ru",
                                        "es",
                                        "ch",
                                        "se",
                                        "tr",
                                        "kw",
                                    ].includes(countryCode)
                                ) {
                                    countryCode = "us";
                                }
                                callback(countryCode);
                            })
                            .catch((error) => {
                                callback("us");
                            });
                    },
                    showSelectedDialCode: true,
                    loadUtils: () =>
                        import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"),
                });

                input.iti = iti;
            });
        }
    }

    const phone = new Phone();
    phone.initializeIntlTelInput();

    function validateDynamicInputs($form) {
        let isValid = true;
        $form
            .find("input[required], textarea[required], select[required]")
            .each(function () {
                if ($(this).is(":visible") && $(this).val().trim() === "") {
                    $(this).addClass("form-error");
                    isValid = false;
                } else {
                    $(this).removeClass("form-error");
                }
            });
        return isValid;
    }

    function validateEmail($form) {
        const emailField = $form.find(".email");
        const emailValue = emailField.val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        emailField.next(".error-message").remove();

        if (!emailValue) {
            // showError(emailField, "Email is required.");
            emailField.addClass("form-error");
            return false;
        } else if (!emailPattern.test(emailValue)) {
            emailField.addClass("form-error");
            showError(
                emailField,
                "Enter a valid email (e.g., user@example.com)",
            );
            console.log("pattern is no valid email");
            return false;
        } else {
            emailField.removeClass("form-error");
            clearError(emailField);
            return true;
        }
    }

    function showError(field, message) {
        field
            .addClass("form-error")
            .after(
                `<span class="error-message text-danger ms-2" style="font-size: 70%">${message}</span>`,
            );
    }

    function clearError(field) {
        field.removeClass("form-error").next(".error-message").remove();
    }

    function validatePhone($form) {
        var phoneInput = $form.find(".phone")[0];
        if (phoneInput && phoneInput.iti) {
            var iti = phoneInput.iti;
            if (!iti.isValidNumber()) {
                $form.find(".phone").addClass("form-error");
                return false;
            } else {
                $form.find(".phone").removeClass("form-error");
                return true;
            }
        } else {
            $form.find(".phone").addClass("form-error");
            return false;
        }
    }

    $(document).on("click", ".lpformsubmit4", function (e) {
        e.preventDefault();
        var $form = $(this).closest("form");
        var $btn = $(this);
        var emailValid = validateEmail($form);
        var phoneValid = validatePhone($form);
        var dynamicValid = validateDynamicInputs($form);

        var isValid = emailValid && phoneValid && dynamicValid;
        if (!isValid) {
            return;
        }
        var name = $form.find(".name").val();
        var email = $form.find(".email").val();
        var phone = $form.find(".phone").val();
        $btn.html("Submitting...");
        $btn.attr("disabled", true);
        $.ajax({
            url: "https://tm-brands.digitechtictest.com/api/leads",
            method: "POST",
            headers: {
                Authorization: "7hq9ybkRaVxINfHvB907nUjEPcfGf8wzjCa7XyAh",
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
            }),
            success: function ({ data }) {
                const errorMsg = document.getElementById("errormsg");
                if (errorMsg.style.display == "block") {
                    errorMsg.style.display = "none";
                }
                $btn.html("Submit");
                $btn.attr("disabled", false);
                window.location.href = `/lp4/sequence/step1?id=${data?.id}`;
            },
            error: function (xhr, status, error) {
                console.log(error);
                const errorMsg = document.getElementById("errormsg");
                errorMsg.innerHTML = "Error submitting form!";
                errorMsg.style.display = "block";
                $btn.removeAttr("disabled");
            },
        });
    });
    $(document).on("click", ".lpformsubmitdash4", function (e) {
        e.preventDefault();
        var $form = $(this).closest("form");
        var $btn = $(this);
        var emailValid = validateEmail($form);
        var phoneValid = validatePhone($form);
        var dynamicValid = validateDynamicInputs($form);

        var isValid = emailValid && phoneValid && dynamicValid;
        if (!isValid) {
            return;
        }
        var name = $form.find(".name").val();
        var email = $form.find(".email").val();
        var phone = $form.find(".phone").val();
        $btn.html("Submitting...");
        $btn.attr("disabled", true);
        $.ajax({
            url: "https://tm-brands.digitechtictest.com/api/leads",
            method: "POST",
            headers: {
                Authorization: "7hq9ybkRaVxINfHvB907nUjEPcfGf8wzjCa7XyAh",
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
            }),
            success: function ({ data }) {
                const errorMsg = document.getElementById("errormsg");
                if (errorMsg && errorMsg.style.display == "block") {
                    errorMsg.style.display = "none";
                }
                $btn.html("Get Started");
                $btn.attr("disabled", false);
                window.location.href = `/lp-4/sequence/step1?id=${data?.id}`;
            },
            error: function (xhr, status, error) {
                console.log(error);
                const errorMsg = document.getElementById("errormsg");
                if (errorMsg) {
                    errorMsg.innerHTML = "Error submitting form!";
                    errorMsg.style.display = "block";
                }
                $btn.removeAttr("disabled");
            },
        });
    });
    $(document).on("click", ".leadFormSubmit2", function (e) {
        e.preventDefault();
        var $form = $(this).closest("form");
        var emailValid = validateEmail($form);
        var phoneValid = validatePhone($form);
        var dynamicValid = validateDynamicInputs($form);
        var isValid = emailValid && phoneValid && dynamicValid;
        if (!isValid) {
            return;
        }

        var name = $form.find(".name").val();
        var email = $form.find(".email").val();
        var phone = $form.find(".phone").val();

        document.querySelector(".leadFormSubmit").innerHTML = `Submitting...`;
        $(".leadFormSubmit").attr("disabled", "true");
        $.ajax({
            url: "https://tm-brands.digitechtictest.com/api/leads",
            method: "POST",
            headers: {
                Authorization: "7hq9ybkRaVxINfHvB907nUjEPcfGf8wzjCa7XyAh",
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
            }),
            success: function (response) {
                window.location.href = `/thankyou`;
            },
            error: function (xhr, status, error) {
                console.log(error);
                const errorMsg = document.getElementById("errormsg");
                errorMsg.innerHTML = "Error submitting form!";
                errorMsg.style.display = "block";

                $(".leadFormSubmit").removeAttr("disabled");
            },
        });
    });

    $(document).on("click", ".contactformsubmit", function (e) {
        e.preventDefault();
        var $form = $(this).closest("form");
        var $btn = $(this);
        var emailValid = validateEmail($form);
        var phoneValid = validatePhone($form);
        var dynamicValid = validateDynamicInputs($form);
        var isValid = emailValid && phoneValid && dynamicValid;
        if (!isValid) {
            return;
        }

        var firstname = $form.find(".firstname").val();
        var lastname = $form.find(".lastname").val();
        var name = firstname + " " + lastname;
        var email = $form.find(".email").val();
        var phone = $form.find(".phone").val();
        var message = $form.find(".message").val();

        $btn.html("Submitting...");
        $btn.attr("disabled", true);
        $.ajax({
            url: "https://tm-brands.digitechtictest.com/api/leads",
            method: "POST",
            headers: {
                Authorization: "7hq9ybkRaVxINfHvB907nUjEPcfGf8wzjCa7XyAh",
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
            }),
            success: function (response) {
                if (response.data && response.data.id) {
                    var lead_id = response.data.id;
                    var leadData = {
                        lead_id: lead_id,
                        lead_step: 1,
                        data: [
                            {
                                question: "Message",
                                answer: message,
                                lead_type: "text",
                                lead_step: 1,
                            },
                        ],
                    };

                    $.ajax({
                        url: "https://tm-brands.digitechtictest.com/api/leadData",
                        method: "POST",
                        headers: {
                            Authorization:
                                "7hq9ybkRaVxINfHvB907nUjEPcfGf8wzjCa7XyAh",
                            "Content-Type": "application/json",
                        },
                        data: JSON.stringify(leadData),
                        success: function (leadDataResponse) {
                            const errorMsg =
                                document.getElementById("errormsg");
                            if (errorMsg.style.display == "block") {
                                errorMsg.style.display = "none";
                            }
                            $btn.html("Submit");
                            $btn.attr("disabled", false);
                            window.location.href = `/thankyou`;
                        },
                        error: function (xhr, status, error) {
                            const errorMsg =
                                document.getElementById("errormsg");
                            errorMsg.innerHTML = "Error submitting form!";

                            errorMsg.style.display = "block";
                            $(".contactformsubmit").removeAttr("disabled");
                        },
                    });
                } else {
                    const errorMsg = document.getElementById("errormsg");
                    errorMsg.innerHTML = "Email Already Exists!";

                    errorMsg.style.display = "block";
                    $btn.html("Discuss your Requirements");
                    $btn.attr("disabled", false);
                }
            },
            error: function (xhr, status, error) {
                console.log(error);
                const errorMsg = document.getElementById("errormsg");
                errorMsg.innerHTML = "Error submitting form!";
                errorMsg.style.display = "block";

                $btn.html("Discuss your Requirements");
                $btn.attr("disabled", false);
            },
        });
    });
});