<template>
  <q-page padding>
    <q-card flat class="row justify-between">
      <PageHeader :breadcrumbs="[{ label: 'Menü İşlemleri' }]" />
      <q-btn
        unelevated
        noCaps
        color="secondary"
        label="Yeni Ekle"
        icon="fa-solid fa-plus"
        @click="openAddDialog()"
      />
    </q-card>

    <q-tree
      :nodes="menuTree"
      node-key="id"
      default-expand-all
      v-model:selected="selected"
      no-nodes-label="Menü bulunamadı"
      no-results-label="Sonuç bulunamadı"
      color="primary"
      class="q-mt-xl"
    >
      <template #default-header="props">
        <div class="row items-center justify-between full-width">
          <div class="col text-body1">
            {{ props.node.label }}
            <span
              v-if="props.node.children && props.node.children.length === 0"
              class="text-caption text-grey-7 q-ml-sm"
            >
              (Alt menüsü yok)
            </span>
          </div>
          <div class="row col text-body1 text-grey-8">
            <q-icon name="link" class="q-mr-sm" /> {{ props.node.link || '#' }}
          </div>
          <div>
            <q-btn-dropdown dense flat color="grey-7" dropdown-icon="more_vert" no-icon-animation>
              <q-list>
                <q-item clickable v-close-popup @click="openAddDialog(props.node)">
                  <q-item-section side>
                    <q-icon name="add" class="q-pr-sm" />
                  </q-item-section>
                  <q-item-section>Alt Menü Ekle</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="openEditDialog(props.node)">
                  <q-item-section side>
                    <q-icon name="edit" class="q-pr-sm" />
                  </q-item-section>
                  <q-item-section>Düzenle</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  class="text-red-5"
                  @click="openDeleteDialog(props.node)"
                >
                  <q-item-section side>
                    <q-icon name="delete" color="red-5" class="q-pr-sm" />
                  </q-item-section>
                  <q-item-section color="">Sil</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </template>
    </q-tree>

    <AddDialog :form="addForm" @add="addNode" />
    <EditDialog :form="editForm" @edit="editNode" />
    <DeleteDialog @confirm="deleteNode" />
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { uid } from 'quasar'
import { AddDialog, EditDialog, DeleteDialog } from './components'
import { PageHeader } from 'src/components'
import { sampleData } from './data'
import { useMenuStore } from 'src/stores/dialogs/menuStore'
import { storeToRefs } from 'pinia'

const { showAddDialog, showEditDialog, showDeleteDialog } = storeToRefs(useMenuStore())

const selected = ref(null)
const addTargetId = ref(null)
const nodeToDelete = ref(null)

const menuTree = reactive(sampleData)

const addForm = reactive({
  label: '',
  link: '',
  index: null,
})

const editForm = reactive({
  id: null,
  label: '',
  link: '',
  index: null,
})

function findNode(id, nodes = menuTree) {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children) {
      const found = findNode(id, node.children)
      if (found) return found
    }
  }
  return null
}

function findNodeAndParent(id, nodes = menuTree, parent = null) {
  for (const node of nodes) {
    if (node.id === id) return { node, parent, nodes }
    if (node.children) {
      const found = findNodeAndParent(id, node.children, node)
      if (found) return found
    }
  }
  return null
}

function openAddDialog(targetNode = null) {
  addTargetId.value = targetNode ? targetNode.id : null
  addForm.label = ''
  addForm.link = ''
  showAddDialog.value = true
}

function openEditDialog(node) {
  editForm.id = node.id
  editForm.label = node.label
  editForm.link = node.link || ''

  const found = findNodeAndParent(node.id)
  if (found) {
    let siblings
    if (found.parent && found.parent.children) {
      siblings = found.parent.children
    } else {
      siblings = menuTree
    }
    editForm.index = siblings.findIndex((n) => n.id === node.id) + 1
  } else {
    editForm.index = null
  }

  showEditDialog.value = true
}

function openDeleteDialog(node) {
  nodeToDelete.value = node
  showDeleteDialog.value = true
}

function deleteNode() {
  if (!nodeToDelete.value) return
  const found = findNodeAndParent(nodeToDelete.value.id)
  if (found) {
    if (found.parent && found.parent.children) {
      found.parent.children = found.parent.children.filter((n) => n.id !== nodeToDelete.value.id)
    } else if (!found.parent) {
      const idx = menuTree.findIndex((n) => n.id === nodeToDelete.value.id)
      if (idx !== -1) menuTree.splice(idx, 1)
    }
  }
  nodeToDelete.value = null
  showDeleteDialog.value = false
}

function editNode() {
  if (!editForm.id) return
  const found = findNodeAndParent(editForm.id)
  if (found && found.node) {
    found.node.label = editForm.label
    found.node.link = editForm.link

    if (typeof editForm.index === 'number') {
      let siblings, oldIdx, newIdx
      if (found.parent && found.parent.children) {
        siblings = found.parent.children
      } else {
        siblings = menuTree
      }
      oldIdx = siblings.findIndex((n) => n.id === editForm.id)
      newIdx = Number(editForm.index) - 1
      newIdx = Math.max(0, Math.min(newIdx, siblings.length - 1))
      if (oldIdx !== -1 && oldIdx !== newIdx) {
        const [moved] = siblings.splice(oldIdx, 1)
        siblings.splice(newIdx, 0, moved)
      }
    }
  }
  editForm.id = null
  editForm.label = ''
  editForm.link = ''
  editForm.index = null
  showEditDialog.value = false
}

function addNode() {
  if (!addForm.label) return
  const newNode = {
    id: uid(),
    label: addForm.label,
    link: addForm.link,
  }
  if (addTargetId.value === null) {
    const idx = addForm.index != null ? Number(addForm.index) - 1 : menuTree.length
    menuTree.splice(idx, 0, { ...newNode, children: [] })
  } else {
    const parent = findNode(addTargetId.value)
    if (!parent) return
    if (!parent.children) parent.children = []
    const idx = addForm.index != null ? Number(addForm.index) - 1 : parent.children.length
    parent.children.splice(idx, 0, newNode)
  }
  addForm.label = ''
  addForm.link = ''
  addForm.index = null
  showAddDialog.value = false
}
</script>
