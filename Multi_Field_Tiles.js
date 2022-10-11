looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  id: "zTest_Do_Not_Use",
  label: "zTest_Do_Not_Use",
  options: {
    // First Field Options -------------------------------------------------
    Title_text: {
      type: "string",
      label: "Enter Title",
      default: 'Default Title',
      section: "Field 1",
      order: 0
    },
    Title_text_font_size: {
      type: "string",
      label: "Title Font Size ",
      values: [
        {"Large": "large"},
        {"Medium": "medium"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large",
      section: "Field 1",
      order: 1
    },
    L1_text_font_size: {
      type: "string",
      label: "Field Font Size ",
      values: [
        {"Large": "large"},
        {"Medium": "medium"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large",
      section: "Field 1",
      order: 2
    },
    //L1_text_font_colour: {
    //    type: "string",
    //    label: "Font Colour",
    //    values: [
    //      {"Dark_Blue": "Dark Blue"},
    //      {"Green": "Green"},
    //      {"Red": "Red"},
    //      {"Grey": "Grey"}
    //    ],
    //    display: "radio",
    //      default: "Dark Blue",
    //    section: "Primary",
    //    order: 2
    //},
    L1_Data_Index: {
      type: "number",
       label: "Column Index",
       default: 0,
       section: "Field 1",
       order: 3
    },
    // Second Field Options -------------------------------------------------
    //L2_Show: {
    //    type: "string",
    //    label: "Show/Hide?",
    //    display: "select",
    //    values: [
    //         {"true": true},
    //         {"false": false}
    //    ],
    //    default: true,
    //    section: "Field 2",
    //    order: 0
    //},
    L2_text: {
      type: "string",
      label: "Enter Field Label",
      default: 'Default Label',
      section: "Field 2",
      order: 1
    },
    L2_text_font_size: {
        type: "string",
        label: "Font Size",
        values: [
          {"Large": "large"},
          {"Medium": "medium"},
          {"Small": "small"}
        ],
        display: "radio",
          default: "large",
        section: "Field 2",
        order: 2
    },
    L2_Data_Index: {
        type: "number",
        label: "Column Index",
        default: 1,
        section: "Field 2",
        order: 3
    },
    // Third Field Options -------------------------------------------------
    //L3_Show: {
    //    type: "string",
    //    label: "Display?",
    //    display: "select",
    //    values: [
    //            {"true": true},
    //            {"false": false}
    //    ],
    //    default: true,
    //    section: "Field 3",
    //    order: 0
    //},
    L3_text: {
      type: "string",
      label: "Enter Field Label",
      default: 'Default Label',
      section: "Field 3",
      order: 1
    },
    L3_text_font_size: {
        type: "string",
        label: "Font Size",
        values: [
            {"Large": "large"},
            {"Medium": "medium"},
            {"Small": "small"}
        ],
        display: "radio",
            default: "large",
        section: "Field 3",
        order: 2
    },
    L3_Data_Index: {
        type: "number",
        label: "Column Index",
        default: 2,
        section: "Field 3",
        order: 3
    }
  },
  // Set up the initial state of the visualization
  create: function(element, config) {

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        .Multi_Line_Test-vis {
          /* Vertical centering */
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .Multi_Line_Test-text-large {
          font-size: 48px;
        }
        .Multi_Line_Test-text-medium {
          font-size: 36px;
        }
        .Multi_Line_Test-text-small {
          font-size: 24px;
        }
      </style>
    `;

    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"));
    container.className = "zTest-Do-Not-Use-vis";

    // Create an element to contain the text.
    this._textElement0 = container.appendChild(document.createElement("div"));
    this._textElement1 = container.appendChild(document.createElement("div"));
    this._textElement2 = container.appendChild(document.createElement("div"));
    this._textElement3 = container.appendChild(document.createElement("div"));

    //if (config.L2_Show) {
    //    this._textElement2 = container.appendChild(document.createElement("div"));
    //}
    //if (config.L3_Show) {
    //    this._textElement3 = container.appendChild(document.createElement("div"));
    //}
    },
    // Render in response to the data or settings changing
    updateAsync: function(data, element, config, queryResponse, details, done) {

    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length === 2) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }

    //if (queryResponse.fields.dimensions.length < 3 && config.L2_Show && config.L3_Show)  {
    //  this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
    //  return;
    //} else if (queryResponse.fields.dimensions.length < 2 && (config.L2_Show || config.L3_Show)){
    //  this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
    //  return;
    //} else if (queryResponse.fields.dimensions.length < 1 && config.L2_Show === false && config.L3_Show === false){
    //    this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
    //    return;
    //}

    // Grab the first cell of the data
    var firstRow = data[0];
    var firstCell = firstRow[queryResponse.fields.dimensions[config.L1_Data_Index].name];
    var secondCell = firstRow[queryResponse.fields.dimensions[config.L2_Data_Index].name];
    var thirdCell = firstRow[queryResponse.fields.dimensions[config.L3_Data_Index].name];

  // Get text data from Config
    var Title = { value: config.Title_text };

    var L2_HTML = LookerCharts.Utils.textForCell(secondCell);
    L2_HTML +=  "&nbsp;";
    L2_HTML +=  LookerCharts.Utils.textForCell({ value: config.L2_text });

    var L3_HTML = LookerCharts.Utils.textForCell(thirdCell);
    L3_HTML +=  "&nbsp;";
    L3_HTML +=  LookerCharts.Utils.textForCell({ value: config.L3_text });

    // Insert the data into the page
    this._textElement0.innerHTML = LookerCharts.Utils.textForCell(Title);
    this._textElement1.innerHTML = LookerCharts.Utils.textForCell(firstCell);
    this._textElement2.innerHTML = L2_HTML;
    this._textElement3.innerHTML = L3_HTML;

    // Set the size to the user-selected size
    if (config.Title_text_font_size == "small") {
      this._textElement0.className = "Multi_Line_Test-text-small";
    } else if(config.Title_text_font_size == "medium") {
      this._textElement0.className = "Multi_Line_Test-text-medium";
    } else {
      this._textElement0.className = "Multi_Line_Test-text-large";
    }
    // Set the size to the user-selected size
    if (config.L1_text_font_size == "small") {
      this._textElement1.className = "Multi_Line_Test-text-small";
    } else if(config.L1_text_font_size == "medium") {
      this._textElement1.className = "Multi_Line_Test-text-medium";
    } else {
      this._textElement1.className = "Multi_Line_Test-text-large";
    }
    // Set the size to the user-selected size
    if (config.L2_text_font_size == "small") {
      this._textElement2.className = "Multi_Line_Test-text-small";
    } else if(config.L2_text_font_size == "medium") {
      this._textElement2.className = "Multi_Line_Test-text-medium";
    } else {
      this._textElement2.className = "Multi_Line_Test-text-large";
    }
    // Set the size to the user-selected size
    if (config.L3_text_font_size == "small") {
      this._textElement3.className = "Multi_Line_Test-text-small";
    } else if(config.L3_text_font_size == "medium") {
      this._textElement3.className = "Multi_Line_Test-text-medium";
    } else {
      this._textElement3.className = "Multi_Line_Test-text-large";
    }
    // We are done rendering! Let Looker know.
    done()
  }
});
