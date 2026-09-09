import {
  DragLayerMonitorProps,
  DropOptions,
  MultiBackend,
  NodeModel,
  PlaceholderRenderParams,
  RenderParams,
  Tree,
  TreeProps,
  getBackendOptions
} from "@minoru/react-dnd-treeview"
import { Button, Chip, ListItemIcon, ListItemText, Menu, MenuItem, alpha, useTheme } from '@mui/material'
import { MD5 } from 'crypto-js'
import * as React from 'react'
import { DndProvider } from "react-dnd"
import { FaTrash } from "react-icons/fa"
import { IoIosAdd } from "react-icons/io"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md"
import { TbEdit } from "react-icons/tb"

export const TreeItemChipComponent = <T,>(props: {
  node: NodeModelExt<T>,
}) => {
  const { node } = props

  if (node.state == 'new') return <Chip style={{ marginLeft: 10 }} label='Novo' variant="filled" size="small" color="primary" />

  if (node.state == 'updated') return <Chip style={{ marginLeft: 10 }} label='Alterado' variant="filled" size="small" color="warning" />

  if (node.state == 'deleted') return <Chip style={{ marginLeft: 10 }} label='Remover' variant="filled" size="small" color="error" />

  return null
}

export type NodeModelExt<T> = NodeModel<T> & {
  state: 'none' | 'new' | 'updated' | 'deleted',
  position: number,
}

export const TreeComponent = <T,>(props: {
  tree: NodeModelExt<T>[],
  rootId?: string | number,
  render?: (node: NodeModelExt<T>, params: RenderParams) => React.ReactElement,
  onDrop: (tree: NodeModelExt<T>[], options: DropOptions<T>) => void,

  persistId?: string, // persiste apenas o estado aberto|fechado, nao os dados
  onItemEditClick?: (node: NodeModelExt<T>) => void,
  onItemAddChildrenClick?: (parentNode: NodeModel<T>, childPosition: number) => boolean,
  onItemRemoveClick?: (node: NodeModelExt<T>) => void,
  renderItemContent?: (node: NodeModel<T>, params: RenderParams) => React.ReactElement,
  getText?: (node: NodeModel<T>) => string,
} & Omit<TreeProps<T>, 'tree' | 'rootId' | 'render' | 'onDrop'>) => {
  const { tree, rootId, render, onDrop, persistId, onItemEditClick, onItemAddChildrenClick, onItemRemoveClick, renderItemContent, getText, ...rest } = props

  const theme = useTheme()

  const [menuAnchor, setAnchorElemnt] = React.useState<Element | (() => Element) | null | undefined>(null)
  const [menuNodeItem, setMenuNodeItem] = React.useState<NodeModelExt<T> | undefined | null>(null)
  const [openNodes, setOpenNodes] = React.useState<(string | number)[]>(() => {
    if (persistId) {
      const value = localStorage.getItem(persistId);
      return value ? JSON.parse(value) : [];
    } else {
      return []
    }
  });

  const openMenu = Boolean(menuAnchor)
  const ident = 20
  const highLightColor = '#2196f3'

  const itemDefaultStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    borderRadius: 5,
  }

  const itemHighlightedStyle: React.CSSProperties = {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: alpha(theme.palette.divider, .5),
    background: alpha(theme.palette.divider, .5),
  }

  const handleRender: (node: NodeModelExt<T>, params: RenderParams) => React.ReactElement = (node, params) => {
    const { isDropTarget, depth, isOpen, onToggle } = params

    const dropTargetStyle: React.CSSProperties | undefined = isDropTarget ? {
      color: highLightColor,
    } : undefined

    const hasChildren = tree.some(n => n.parent == node.id)

    const buttonGap = 0
    const defaultButtonStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'start',
      textTransform: 'none',
      gap: buttonGap,
      color: theme.palette.text.primary,
      ...dropTargetStyle,
    }

    const content = <>{renderItemContent?.(node, params) ?? (getText?.(node) ?? node.text)}</>

    return <div style={{
      ...itemDefaultStyle,
      marginInlineStart: depth * ident,
    }}>
      {hasChildren ?
        <Button
          onContextMenu={(e) => {
            e.preventDefault()
            setAnchorElemnt(e.currentTarget)
            setMenuNodeItem(node)
          }}
          style={{
            ...defaultButtonStyle,
          }}
          startIcon={isOpen ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
          onClick={onToggle}
        ><>{content}<TreeItemChipComponent node={node} /></></Button> :
        <Button
          onContextMenu={(e) => {
            e.preventDefault()
            setAnchorElemnt(e.currentTarget)
            setMenuNodeItem(node)
          }}
          style={{
            ...defaultButtonStyle,
            marginLeft: 24 + buttonGap // isso porque esse item nao tem o startIcon, entao o gap nao vai existir entre o icone e o proximo content
          }}
        ><>{content}<TreeItemChipComponent node={node} /></></Button>}
    </div>
  }

  const dragPreviewRender: (monitorProps: DragLayerMonitorProps<T>) => React.ReactElement = (monitorProps) => (
    <span style={{
      ...itemDefaultStyle,
      ...itemHighlightedStyle,
      paddingInline: 10,
      paddingBlock: 5,
      borderColor: highLightColor,
    }}>{monitorProps.item.text}</span>
  )

  const placeholderRender: (node: NodeModel<T>, params: PlaceholderRenderParams) => React.ReactElement = (_node, { depth: _depth }) => (
    <>
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: 2, background: highLightColor, borderRadius: 10 }}></div>
      </div>
    </>
  )

  const key = MD5(JSON.stringify(tree)).toString()

  return <>
    <Menu
      id="basic-menu"
      anchorEl={menuAnchor}
      open={openMenu}
      onClose={() => setAnchorElemnt(null)}
      slotProps={{
        list: {
          sx: {
            p: 0,
          }
        },
        paper: {
          sx: {
            // marginTop: .5,
            // minWidth: 260,
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            overflow: "hidden",
          },
        }
      }}
    >
      <MenuItem
        style={{ display: 'flex', paddingLeft: 5 }}
        onClick={() => {
          setAnchorElemnt(null)
          if (menuNodeItem)
            onItemEditClick?.(menuNodeItem)
        }}
      >
        <ListItemIcon style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TbEdit />
        </ListItemIcon>
        <ListItemText primary='Editar' />
      </MenuItem>

      <MenuItem
        style={{ display: 'flex', paddingLeft: 5 }}
        onClick={() => {
          setAnchorElemnt(null)
          if (menuNodeItem) {
            const menuNodeItemChildrenLen = tree.filter(c => c.parent == menuNodeItem.id).length
            const newChildPosition = menuNodeItemChildrenLen + 1
            if (onItemAddChildrenClick?.(menuNodeItem, newChildPosition)) {
              setOpenNodes(old => {
                const result = [...old, menuNodeItem.id]
                return result
              })
            }
          }
        }}
      >
        <ListItemIcon style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IoIosAdd size={30} />
        </ListItemIcon>
        <ListItemText primary='Adicionar Filho' />
      </MenuItem>

      <MenuItem
        style={{ display: 'flex', paddingLeft: 5 }}
        onClick={() => {
          setAnchorElemnt(null)
          if (menuNodeItem)
            onItemRemoveClick?.(menuNodeItem)
        }}
      >
        <ListItemIcon style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FaTrash />
        </ListItemIcon>
        <ListItemText primary='Remover' />
      </MenuItem>
    </Menu>

    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        key={key}
        {...rest}

        // required
        tree={tree}
        rootId={rootId ?? ""}
        render={render as any ?? handleRender}
        onDrop={(newTree: NodeModel<T>[], options: DropOptions<T>) => {
          // https://claude.ai/share/4339c7aa-6280-43f6-a883-fdc22b45393c

          // 1. Mapa auxiliar: novo master_uuid (parent) de cada nó, baseado na estrutura pós-drop
          const newParentById = new Map<string, string>()
          newTree.forEach(n => {
            newParentById.set(String(n.id), n.parent ? String(n.parent) : "")
          })

          // 2. Contador de ordem por nível, usando o NOVO parent como chave
          const orderCounters = new Map<string, number>()

          const repositionedTree = newTree.map(newTreeNode => {
            const newMasterUuid = newParentById.get(String(newTreeNode.id)) ?? ""
            const nextOrder = (orderCounters.get(newMasterUuid) ?? 0) + 1
            orderCounters.set(newMasterUuid, nextOrder)

            return {
              ...newTreeNode as NodeModelExt<T>,
              position: nextOrder,
            } as NodeModelExt<T>
          });

          // 3. Compara contra a árvore ANTERIOR (tree, via props) para detectar
          //    todos os itens cujo parent ou position mudaram
          const oldByUuid = new Map(tree.map(d => [d.id, d]))

          const updatedItems = repositionedTree.filter(novo => {
            const antigo = oldByUuid.get(novo.id)
            if (!antigo) return false // não deveria acontecer aqui, mas por segurança

            return antigo.parent != novo.parent || antigo.position != novo.position
          })

          // 4. Marca como 'updated' os itens alterados, preservando 'new' se já era novo
          const updatedStateTree = repositionedTree.map(n => {
            const updated = updatedItems.some(i => i.id == n.id)
            if (!updated) return n

            return {
              ...n,
              state: n.state == 'new' ? 'new' : 'updated',
            } as NodeModelExt<T>
          })

          onDrop(updatedStateTree, options)
        }}

        // nullable
        dropTargetOffset={props.dropTargetOffset ?? 5}
        sort={props.sort != null ? props.sort : false}
        listComponent={props.listComponent ?? "div"}
        listItemComponent={props.listItemComponent ?? "div"}
        placeholderComponent={props.placeholderComponent ?? "div"}
        enableAnimateExpand={props.enableAnimateExpand != null ? props.enableAnimateExpand : true}

        initialOpen={props.initialOpen ?? openNodes}
        onChangeOpen={(ids) => {
          setOpenNodes(ids);
          if (persistId)
            localStorage.setItem(persistId, JSON.stringify(ids));
          props.onChangeOpen?.(ids)
        }}

        dragPreviewRender={props.dragPreviewRender ?? dragPreviewRender}
        placeholderRender={props.placeholderRender ?? placeholderRender}

      />
    </DndProvider>
  </>
}