import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import { 
  Play, 
  Square, 
  Save,
  Download,
  Upload,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Maximize,
  Settings
} from 'lucide-react';

const BotBuilder = () => {
  const { user, api } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [workspace, setWorkspace] = useState<any>(null);

  useEffect(() => {
    // Initialize Blockly workspace
    const blocklyDiv = document.getElementById('blocklyDiv');
    if (blocklyDiv) {
      const ws = Blockly.inject(blocklyDiv, {
        toolbox: getToolbox(),
        trashcan: true,
        scrollbars: true,
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2
        }
      });
      setWorkspace(ws);
    }

    return () => {
      if (workspace) {
        workspace.dispose();
      }
    };
  }, []);

  const getToolbox = () => {
    return {
      kind: 'categoryToolbox',
      contents: [
        {
          kind: 'category',
          name: 'Logic',
          colour: '#5C81A6',
          contents: [
            {
              kind: 'block',
              type: 'controls_if'
            },
            {
              kind: 'block',
              type: 'logic_compare'
            }
          ]
        },
        {
          kind: 'category',
          name: 'Trading',
          colour: '#A65C81',
          contents: [
            {
              kind: 'block',
              type: 'purchase'
            },
            {
              kind: 'block',
              type: 'trade_again'
            }
          ]
        }
      ]
    };
  };

  const handleRun = () => {
    if (!isRunning) {
      // Generate and run JavaScript code from blocks
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      try {
        // Execute the trading bot code
        eval(code);
        setIsRunning(true);
      } catch (error) {
        console.error('Error running bot:', error);
      }
    } else {
      // Stop the bot
      setIsRunning(false);
    }
  };

  const handleSave = () => {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    localStorage.setItem('savedBlocks', xmlText);
  };

  const handleLoad = () => {
    const savedXml = localStorage.getItem('savedBlocks');
    if (savedXml) {
      const xml = Blockly.Xml.textToDom(savedXml);
      Blockly.Xml.domToWorkspace(xml, workspace);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRun}
              className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                isRunning
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isRunning ? <Square size={16} className="mr-2" /> : <Play size={16} className="mr-2" />}
              {isRunning ? 'Stop' : 'Run'}
            </button>
            
            <button onClick={handleSave} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Save size={20} />
            </button>
            <button onClick={handleLoad} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Upload size={20} />
            </button>
            
            <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2" />
            
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Undo size={20} />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Redo size={20} />
            </button>
            
            <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2" />
            
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <ZoomIn size={20} />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <ZoomOut size={20} />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Maximize size={20} />
            </button>
          </div>
          
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main workspace */}
      <div className="flex-1 flex">
        {/* Blockly workspace */}
        <div id="blocklyDiv" className="flex-1" />
        
        {/* Right sidebar - Bot info */}
        <div className="w-64 bg-gray-100 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Bot Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Status</label>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {isRunning ? 'Running' : 'Stopped'}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Total Trades</label>
              <div className="text-lg font-medium text-gray-900 dark:text-white">0</div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Win Rate</label>
              <div className="text-lg font-medium text-green-600 dark:text-green-400">0%</div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Profit/Loss</label>
              <div className="text-lg font-medium text-gray-900 dark:text-white">$0.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotBuilder;