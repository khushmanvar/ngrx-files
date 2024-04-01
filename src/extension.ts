import * as vscode from 'vscode';
import { posix } from 'path';
import { ExtensionContext, commands, window } from 'vscode';
import { getStoreFiles } from './utils/getStoreFiles';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('extension.generateNGRXStoreFiles', async () => {

		const result = await window.showInputBox({
			placeHolder: 'Enter the name of your store',
		});

		if (!vscode.workspace.workspaceFolders) {
			return vscode.window.showInformationMessage('No folder or workspace opened');
		}

		const nameOfStore = result;
		
		if (nameOfStore) {
			const writeData = Buffer.from(getStoreFiles(nameOfStore), 'utf8');
	
			const folderUri = vscode.workspace.workspaceFolders[0].uri;
			const fileUri = folderUri.with({ path: posix.join(folderUri.path, nameOfStore + '.actions.ts') });
	
			await vscode.workspace.fs.writeFile(fileUri, writeData);
			
			vscode.window.showTextDocument(fileUri);

			window.showInformationMessage(`Created ${result} store`);
		}
	}));
}
