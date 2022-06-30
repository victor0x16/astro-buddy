import { AstroIntegration } from 'astro';

interface Item {
    Name: string;
    Installed: string;
}


function isInstalled(packageName: string): string {
    // package is working...
    return "Yes";
}

//function getContent() {}

//const integrations = ["react", "vue"];
const table: Item[] = [];




export default function (): AstroIntegration {
	return {
		name: '@astrojs/astro-buddy',
		hooks: {
			'astro:config:setup': () => {
                console.log('astro:config:setup');
                console.table(table);
			},
            'astro:config:done': (settings) => {
                console.log(settings);
                const { integrations } = settings.config; 
                for (let i = 0; i<integrations.length; i++) {
                    let name = integrations[i].name;
                    table.push({ Name: name.toUpperCase(), Installed: isInstalled(name) });
                }
            },
            'astro:server:start': (settings) => {
                console.log('astro:server:start');
                // I don't have access to integrations object
                console.table(table)
            }
		},
	};
}
