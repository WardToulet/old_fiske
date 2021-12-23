import { FunctionalComponent } from "preact";

export const GroupsPage: FunctionalComponent = () => {
	return (
		<div class="grid gap-4">
			<section class="grid gap-2">
				<h1 class="text-gray-600 text-sm">Ward Toulet (Caraya)</h1>

				<ul class="flex gap-4 flex)wrap">
					<li class="grow md:max-w-xs shadow bg-white rounded cursor-pointer">
						<a class="grid grid-cols-4" href="#v2">
							<div class="p-4 bg-teal-400 text-gray-50 rounded-tl rounded-bl grid">
								<span class="place-self-center">V2</span>
							</div>
							<div class="px-4 py-2 col-span-3">
								<h1 class="font-semibold">Verkenners 2</h1>
								<span class="text-gray-800 font-light">26 leden</span>
							</div>
						</a>
					</li>
				</ul>
			</section>

			<section class="grid gap-2">
				<h1 class="text-gray-600 text-sm">Klaas Toulet (Pinty)</h1>

				<ul class="flex gap-4 flex-wrap">
					<li class="grow md:max-w-xs shadow bg-white rounded cursor-pointer">
						<a class="grid grid-cols-4" href="#v2">
							<div class="p-4 bg-purple-400 text-gray-50 rounded-tl rounded-bl grid">
								<span class="place-self-center">JV3</span>
							</div>
							<div class="px-4 py-2 col-span-3">
								<h1 class="font-semibold">Jongverkenners 3</h1>
								<span class="text-gray-800 font-light">24 leden</span>
							</div>
						</a>
					</li>
					<li class="grow md:max-w-xs shadow bg-white rounded cursor-pointer">
						<a class="grid grid-cols-4" href="#v2">
							<div class="p-4 bg-orange-400 text-gray-50 rounded-tl rounded-bl grid">
								<span class="place-self-center">JV3</span>
							</div>
							<div class="px-4 py-2 col-span-3">
								<h1 class="font-semibold">Jongverkenners 3</h1>
								<span class="text-gray-800 font-light">24 leden</span>
							</div>
						</a>
					</li>
				</ul>
			</section>
		</div>
	);
}
