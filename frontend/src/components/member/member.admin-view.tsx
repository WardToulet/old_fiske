import { FunctionalComponent } from "preact";

import UserIcon from "remixicon-react/UserLineIcon";
import NicknameIcon from "remixicon-react/BearSmileLineIcon";

export const MemberAdminView: FunctionalComponent = () => {
	return (
		<article className="grid gap-2">
			<h1 className="text-2xl font-semibold">
				Ward Toulet
			</h1>

			<section className="grid gap-1">
				<h2 className="text-lg text-gray-700">Lid info</h2>
				<dl className="grid grid-cols-[40%_1fr]">
					<dt className="text-gray-700 font-light flex gap-2">
						<UserIcon size="1em"/>
						Naam
					</dt>
					<dd>Ward Toulet</dd>

					<dt className="text-gray-700 font-light flex gap-2">
						<NicknameIcon size="1em"/>
						Totem
					</dt>
					<dd>Caraya</dd>
				</dl>
			</section>

			<section>
				<h2 className="text-lg text-gray-700">
					Groepen
				</h2>
				<dl>
					<dt className="hidden">Groepen</dt>
					<dd>
						<ul className="flex gap-2">
							<li>V2</li>
							<li>LEI</li>
						</ul>
					</dd>
				</dl>
			</section>
		</article>
	);
}
