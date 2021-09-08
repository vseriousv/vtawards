<template>
	<section class="committee-block mxw1200">
		<v-simple-table class="tableAll">
			<template v-slot:default>
				<tbody>
					<tr
						v-for="(itemField, id) in committee"
						class="tr_row"
						:key="`committeeItem${id}`"
					>
						<td class="td_block text-center">
							<div class="avatar">
								<img :src="`${URL_AVATARS}${itemField.img}`" />
							</div>
						</td>
						<td v-if="$t('lang') === 'ru'" class="td_block text-left">
							{{ itemField.name_ru }}
						</td>
						<td v-if="$t('lang') === 'en'" class="td_block text-left">
							{{ itemField.name_en }}
						</td>
						<td v-if="$t('lang') === 'ru'" class="td_block text-left">
							{{ itemField.position_ru }}
						</td>
						<td v-if="$t('lang') === 'en'" class="td_block text-left">
							{{ itemField.position_en }}
						</td>
						<td v-if="$t('lang') === 'ru'" class="td_block text-left">
							{{ itemField.state_ru }}
						</td>
						<td v-if="$t('lang') === 'en'" class="td_block text-left">
							{{ itemField.state_en }}
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</section>
</template>

<script>
import config from "../../constants/config";
import axios from "axios";
export default {
	name: "CommitteeBlock",
	data() {
		return {
			committee: [],
			URL_AVATARS: config.URL_AVATARS
		};
	},
	created() {
		this.getCommittee();
	},
	methods: {
		getCommittee: function() {
			const url = config.API_URL + "/participants/isactive";
			axios
				.get(url, {
					headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
				})
				.then(result => {
					console.log(result.data);
					this.setUsersArray(result.data);
				})
				.catch(e => console.error("committee-error:", e));
		},
		setUsersArray: async function(data) {
			for (let i = 0; i < data.length; i++) {
				const userObject = {
					id: data[i].user.id,
					tabNumber: data[i].user.tabNumber,
					img: data[i].user.img ? data[i].user.img : "null.png",
					name_ru:
						data[i].user.firstname_ru +
						" " +
						data[i].user.patronymic_ru +
						" " +
						data[i].user.lastname_ru,
					name_en: data[i].user.firstname_en + " " + data[i].user.lastname_en,
					state_ru: data[i].user.state ? data[i].user.state.value_ru : "",
					state_en: data[i].user.state ? data[i].user.state.value_en : "",
					position_ru: data[i].user.position
						? data[i].user.position.value_ru
						: "",
					position_en: data[i].user.position
						? data[i].user.position.value_en
						: "",
					voting: data[i].voting
				};
				this.committee.push(userObject);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.committee-block {
	width: 100%;
	min-height: 600px;
	margin-top: 50px;
	.tableAll {
		width: 100%;
		height: 100%;
		.manageDelete {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.manageBTN {
				margin: 0 10px;
			}
		}
		.tr_row {
			.avatar {
				width: 44px;
				height: 44px;
				border-radius: 50%;
				overflow: hidden;
				margin: 5px;
				img {
					width: 44px;
					height: 44px;
				}
			}
			.td_block {
				min-height: 63px;
			}
		}
	}
}
</style>
