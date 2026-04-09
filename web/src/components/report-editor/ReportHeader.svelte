<script lang="ts">
	import { t } from "../../stores/localeStore";
	export let isEditing: boolean;
	export let isSaving: boolean;
	export let isLoading: boolean;
	export let onCancel: () => void;
	export let onSave: () => void;
</script>

<header class="editor-header">
	<h1 class="editor-title">
		{isEditing ? $t("common.editReport") || "Edit Report" : $t("common.createNewReport") || "Create New Report"}
	</h1>
	<div class="header-actions">
		<button
			class="btn btn-secondary"
			onclick={onCancel}
			disabled={isSaving}
			type="button"
			aria-label={isEditing
				? $t("common.cancelEditingReport") || "Cancel editing report"
				: $t("common.cancelCreatingReport") || "Cancel creating report"}
		>
			{$t("common.cancel") || "Cancel"}
		</button>
		<button
			class="btn btn-primary"
			onclick={onSave}
			disabled={isSaving || isLoading}
			type="button"
			aria-label={isSaving ? $t("common.savingReport") || "Saving report..." : $t("common.saveReport") || "Save report"}
		>
			{isSaving ? $t("common.saving") || "Saving..." : $t("common.saveReport") || "Save Report"}
		</button>
	</div>
</header>

<style>
	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--border-color);
		background: var(--surface-color);
	}

	.editor-title {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.header-actions {
		display: flex;
		gap: 0.75rem;
	}

	.btn {
		padding: 5px 16px;
		border-radius: 3px;
		font-size: 10px;
		font-weight: 600;
		border: none;
		cursor: pointer;
		transition: all 0.1s;
	}

	.btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.04);
		color: rgba(255, 255, 255, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.btn-secondary:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.7);
	}

	.btn-primary {
		background: rgba(var(--accent-rgb), 0.06);
		color: rgba(var(--accent-text-rgb), 0.7);
		border: 1px solid rgba(var(--accent-rgb), 0.1);
	}

	.btn-primary:hover:not(:disabled) {
		background: rgba(var(--accent-rgb), 0.12);
		color: rgba(var(--accent-text-rgb), 0.9);
	}
</style>
