import * as Blockly from 'blockly/core';
import 'blockly/javascript';

// Define custom blocks for trading
Blockly.Blocks['purchase'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Purchase")
        .appendField(new Blockly.FieldDropdown([
          ["Call", "CALL"],
          ["Put", "PUT"]
        ]), "CONTRACT_TYPE");
    this.appendValueInput("AMOUNT")
        .setCheck("Number")
        .appendField("Amount");
    this.appendValueInput("DURATION")
        .setCheck("Number")
        .appendField("Duration (ticks)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
  }
};

Blockly.Blocks['trade_again'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Trade Again");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
  }
};

// Generate JavaScript code for custom blocks
Blockly.JavaScript['purchase'] = function(block) {
  const contractType = block.getFieldValue('CONTRACT_TYPE');
  const amount = Blockly.JavaScript.valueToCode(block, 'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC);
  const duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
  
  return `purchase("${contractType}", ${amount}, ${duration});\n`;
};

Blockly.JavaScript['trade_again'] = function(block) {
  return 'tradeAgain();\n';
};

export const initializeBlocks = () => {
  // Any additional initialization can go here
};