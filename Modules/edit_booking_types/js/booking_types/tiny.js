 tinymce.init({
        selector: ".editor",
        plugins: "image code media lists link ",
        menubar: false,
        statusbar: false,
        toolbar:
          "undo redo | bold italic underline | numlist bullist| link | mybutton | code",

        setup: function (editor) {
          /* Menu items are recreated when the menu is closed and opened, so we need
     a variable to store the toggle menu item state. */
          var toggleState = false;

          /* example, adding a toolbar menu button */
          editor.ui.registry.addMenuButton("mybutton", {
            text: "Dynamic Variables",
            fetch: function (callback) {
              var items = [
                {
                  type: "menuitem",
                  text: "{{my_name}}",
                  onAction: function () {
                    editor.insertContent(
                      "{{my_name}}"
                    );
                  },
                },

                {
                  type: "menuitem",
                  text: "{{customer_name}}",
                  onAction: function () {
                    editor.insertContent(
                      "{{customer_name}}"
                    );
                  },
                },
                {
                  type: "menuitem",
                  text: "{{customer_time}}",
                  onAction: function () {
                    editor.insertContent(
                      "{{customer_time}}"
                    );
                  },
                },
                {
                  type: "menuitem",
                  text: "{{customer_email}}",
                  onAction: function () {
                    editor.insertContent(
                      "{{customer_email}}"
                    );
                  },
                },
                {
                  type: "menuitem",
                  text: "{{customer_date}}",
                  onAction: function () {
                    editor.insertContent(
                      "{{customer_date}}"
                    );
                  },
                },
                {
                  type: "menuitem",
                  text: "{{booking_type_name}}",
                  onAction: function () {
                    editor.insertContent(
                      "{{booking_type_name}}"
                    );
                  },
                },
                {
                  type: "menuitem",
                  text: "{{location}}",
                  onAction: function () {
                    editor.insertContent(
                      "{{location}}"
                    );
                  },
                },
                {
                  type: "menuitem",
                  text: "{{location_name}}",
                  onAction: function () {
                    editor.insertContent(
                      "{{location_name}}"
                    );
                  },
                },
                {
                  type: "menuitem",
                  text: "{{form_responses}}",
                  onAction: function () {
                    editor.insertContent(
                      "{{form_responses}}"
                    );
                  },
                },
                {
                  type: "menuitem",
                  text: "{{booking_type_description}}",
                  onAction: function () {
                    editor.insertContent(
                      "{{booking_type_description}}"
                    );
                  },
                },
              ];
              callback(items);
            },
          });
        },
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:18px }",
      });
