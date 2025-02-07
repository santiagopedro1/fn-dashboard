<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';

	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';

	import { Sun, Moon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	let { children } = $props();

	const nav = [
		{ name: 'visão geral', href: '/' },
		{ name: 'caixa', href: '/caixa' },
		{ name: 'demonstrativo', href: '/demonstrativo' }
	];
</script>

<ModeWatcher />
<header class="grid grid-cols-3 items-center px-8 py-2">
	<h1 class="text-3xl font-bold">Dashboard</h1>
	<nav>
		<ul class="flex items-center gap-4">
			{#each nav as { name, href }}
				<li>
					<a
						{href}
						class="hover:border-primary border-b-2 border-transparent px-4 py-1 text-lg capitalize
						{page.url.pathname === href ? 'border-primary! pointer-events-none' : ''}"
					>
						{name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<Button
		onclick={toggleMode}
		size="icon"
		class="justify-self-end"
	>
		{#if $mode === 'dark'}
			<Sun />
		{:else}
			<Moon />
		{/if}
	</Button>
</header>

<main class="mx-auto max-w-6xl p-4">
	{@render children()}
</main>
